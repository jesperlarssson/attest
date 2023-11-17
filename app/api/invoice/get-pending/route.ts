import { getSqlSelect } from "@/services/infor";

export async function GET() {
  try {
    const list = await getSqlSelect(
      "EPDIVI, EPSPYN, EPSUNO, EPSINO, EPINYR, EPVONO, EPIVDT, EPDUDT, EPCUCD, EPCUAM  from FPLEDG where EPCONO = '790' and EPDIVI = 'CCC' and EPTRCD = '40' and EPAPRV <> 1 & maxrecs = '0'"
    );
    return Response.json(list);
  } catch (error) {
    console.log(error)
    throw error;
  }
}
