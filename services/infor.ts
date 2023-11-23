import axios from "axios";

// Define types for your environment variables for better type checking
type EnvVariables = {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  serviceAccountApiKey: string;
  serviceAccountSecretKey: string;
};

// Function to get the environment variables
function getEnvVariables(): EnvVariables {
  const baseUrl = process.env.NEXT_PUBLIC_SSO_PROVIDER_URL || "";
  const tokenPath = process.env.NEXT_PUBLIC_OAUTH_TOKEN || "";

  // Ensuring there's a slash between the two parts of the path
  const tokenUrl = `${baseUrl.replace(/\/?$/, "/")}${tokenPath.replace(
    /^\//,
    ""
  )}`;

  return {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    tokenUrl: tokenUrl,
    serviceAccountApiKey: process.env.SERVICE_ACCOUNT_API_KEY || "",
    serviceAccountSecretKey: process.env.SERVICE_ACCOUNT_SECRET_KEY || "",
  };
}

async function getOAuthToken(): Promise<string> {
  const env = getEnvVariables();

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", env.clientId);
  params.append("client_secret", env.clientSecret);
  params.append("username", env.serviceAccountApiKey);
  params.append("password", env.serviceAccountSecretKey);

  try {
    const response = await axios.post(env.tokenUrl, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}

async function getInforM3MIv2Axios(apiUrl: string): Promise<any> {
  try {
    const token = await getOAuthToken();
    const currentEpochTimestampSeconds = Math.floor(Date.now() / 1000);
    const headers = {
      Authorization: `Bearer ${token}`,
      Cookie: `useractivity_cookie_mingle=${currentEpochTimestampSeconds}`,
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ION_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/M3/m3api-rest/v2/execute${apiUrl}`,
      { headers }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`HTTP error! status: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(`No response received: ${error.request}`);
    } else {
      throw new Error(`Error in setting up the request: ${error.message}`);
    }
  }
}

async function postInforM3MIv2Axios(
  apiUrl: string,
  requestBody: any
): Promise<any> {
  try {
    const token = await getOAuthToken();
    const currentEpochTimestampSeconds = Math.floor(Date.now() / 1000);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Cookie: `useractivity_cookie_mingle=${currentEpochTimestampSeconds}`,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ION_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/M3/m3api-rest/v2/execute${apiUrl}`,
      requestBody,
      { headers }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`HTTP error! status: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(`No response received: ${error.request}`);
    } else {
      throw new Error(`Error in setting up the request: ${error.message}`);
    }
  }
}

async function getSqlSelect(query: string): Promise<any> {
  try {
    const list = await getInforM3MIv2Axios(
      `/EXPORTMI/Select?SEPC=;&HDRS=1&QERY=${query}`
    );
    return list.results[0].records;
  } catch (error) {
    throw error;
  }
}

async function getCugexInstancesForUserId(
  id: string,
  file = "MATE_H"
): Promise<any> {
  try {
    const list = await getInforM3MIv2Axios(
      `/EXPORTMI/Select?SEPC=;&HDRS=1&QERY=F1PK01, F1PK02, F1PK03, F1A030 from CUGEX1 where F1A130 = '${id}' and F1FILE = '${file}'`
    );
    return list.results[0].records;
  } catch (error) {
    throw error;
  }
}

async function getSupplierInvoiceTotalInfo(
  divi: string,
  payee: string,
  invoice_number: string,
  year: string,
  supplier: string
): Promise<any> {
  const input = {
    divi,
    payee,
    invoice_number,
    year,
    supplier,
  };
  try {
    const list = await getInforM3MIv2Axios(
      `/APS200MI/GetInvTotInfo?DIVI=${divi}&SPYN=${payee}&SINO=${invoice_number}&INYR=${year}&SUNO=${supplier}&dateformat=YMD8&excludeempty=false&righttrim=true&format=PRETTY&extendedresult=false
      `
    );
    return list.results[0].records[0]; //Return first incvoice
  } catch (error) {
    throw error;
  }
}

async function updateInCugex(body: any) {
  const { file, pk01, pk02, pk03, a030, a130, a230, a330, a430, a530 } = body;

  try {
    const list = await getInforM3MIv2Axios(
      `/CUSEXTMI/ChgFieldValue?FILE=${file}&PK01=${pk01}&PK02=${pk02}&PK03=${pk03}&A030=${a030}&A130=${a130}&maxrecs=0`
    );

    return list.results[0].records[0]; //Return first incvoice
  } catch (error) {
    throw error;
  }
}

async function postToCugex(body: any) {
  const { file, pk01, pk02, pk03, pk04, a030, a130, a230, a330, a430, a530 } =
    body;

  try {
    const list = await getInforM3MIv2Axios(
      `/CUSEXTMI/AddFieldValue?FILE=${file}&PK01=${pk01}&PK02=${pk02}&PK03=${pk03}&PK04=${pk04}&A030=${a030}&A130=${a130}&A230=${a230}&A330=${a330}&A430=${a430}&A530=${a530}&maxrecs=0`
    );

    return list.results[0].records[0]; //Return first incvoice
  } catch (error) {
    throw error;
  }
}

async function getIDMAxios(apiUrl: string): Promise<any> {
  try {
    const token = await getOAuthToken();
    const currentEpochTimestampSeconds = Math.floor(Date.now() / 1000);
    const headers = {
      Authorization: `Bearer ${token}`,
      Cookie: `useractivity_cookie_mingle=${currentEpochTimestampSeconds}`,
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ION_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/IDM/api${apiUrl}`,
      { headers }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`HTTP error! status: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(`No response received: ${error.request}`);
    } else {
      throw new Error(`Error in setting up the request: ${error.message}`);
    }
  }
}

export {
  getInforM3MIv2Axios,
  postInforM3MIv2Axios,
  getSqlSelect,
  getIDMAxios,
  getCugexInstancesForUserId,
  getSupplierInvoiceTotalInfo,
  postToCugex,
  updateInCugex,
};
