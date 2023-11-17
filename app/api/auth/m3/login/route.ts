import { getInforM3MIv2Axios, postInforM3MIv2Axios } from "@/services/infor";
import { User } from "@/types";

function transformUsers(apiUsers: Array<any>): Array<User> {
  return apiUsers.map((apiUser) => {
    var nextLevel;
    if (apiUser.APCG != "") {
      nextLevel = transformUsers(
        apiUsers.filter((user: { APCD: string }) => user.APCD === apiUser.APCG)
      )[0];
    } else {
      nextLevel = null;
    }
    return {
      division: apiUser.DIVI,
      id: apiUser.APCD,
      fullName: apiUser.TX40,
      name: apiUser.TX15,
      maxApproveAmount: apiUser.ALAM,
      nextLevel: nextLevel,
      responsible: apiUser.RESP,
      notAvailableFrom: apiUser.FRDT,
      notAvailableTo: apiUser.TODT,
      securityAccess: apiUser.SECA,
      approvalFlow: apiUser.APFL,
    };
  });
}

const getM3User = async (employmentId: string, pincode: string) => {
  //TODO: Call M3 API to check for user
  return {
    employmentId,
  };
};

const getAllAuthorizedUsers = async (divi: string) => {
  try {
    const response = await getInforM3MIv2Axios(
      `/CRS650MI/LstByCode?DIVI=${divi}&dateformat=YMD8&excludeempty=false&righttrim=true&format=PRETTY&extendedresult=false`
    );
    const readableUsers = transformUsers(response.results[0].records);
    return readableUsers;
  } catch (error) {
    throw error;
  }
};
export async function POST(request: Request) {
  const { employmentId, divi, password } = await request.json();
  try {
    const users = await getAllAuthorizedUsers(divi);
    const filteredUsers = users.filter(
      (user: { id: string }) => user.id === employmentId
    );
    return Response.json(filteredUsers[0]);
  } catch (error) {
    throw error;
  }
}
