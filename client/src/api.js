import axios from "axios"; 
import { aws4Interceptor } from "aws4-axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const POSTFIX = process.env.REACT_APP_POSTFIX;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const RESOUCE = process.env.REACT_APP_RESOUCE;

export const signApi = (awsCred ) => {
    const { AccessKeyId , SecretKey , SessionToken } = awsCred.Credentials;
    const awsInterceptor = aws4Interceptor(
        {
          region: "us-east-1",
          service: "execute-api",
        },
        {
          accessKeyId: AccessKeyId,
          secretAccessKey: SecretKey,
          sessionToken: SessionToken
          
        }
      );
      axios.interceptors.request.use(awsInterceptor)     
}
