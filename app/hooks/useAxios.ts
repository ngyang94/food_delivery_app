import { useEffect, useState } from "react";
import api from "../api/api";

const useAxios = (endPoint: string, methods = "GET", body = {}) => {
  const [isLoading, setIsloading] = useState(true);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (methods == "GET") {
      api
        .get(endPoint)
        .then((res: any) => {
          setApiData(res.data);
          setIsloading(false);
        })
        .catch((error: any) => {
          setApiData(null);
          setIsloading(false);
        });
    } else //  if(methods=="POST")
    {
      api
        .post(endPoint, body)
        .then((res: any) => {
          setApiData(res.data);
          setIsloading(false);
        })
        .catch((error: any) => {
          setApiData(null);
          setIsloading(false);
        });
    }
  }, []);

  return {
    isLoading,
    apiData,
  };
};
export default useAxios;
