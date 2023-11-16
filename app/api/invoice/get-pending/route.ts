import { getInforM3MIv2Axios } from "@/services/infor";

export async function GET() {
  try {
    const list = await getInforM3MIv2Axios(
      "/EXPORTMI/Select?SEPC=;&HDRS=1&QERY=EPDIVI, EPSPYN, EPSUNO, EPSINO, EPINYR, EPVONO, EPIVDT, EPDUDT, EPCUCD, EPCUAM  from FPLEDG WHERE EPCONO=790 AND EPDIVI='CCC' AND EPTRCD=40 AND EPAPRV<>1&maxrecs=0"
    );
    return Response.json(list.results[0].records);
  } catch (error) {
    console.log(error)
    throw error;
  }
}
