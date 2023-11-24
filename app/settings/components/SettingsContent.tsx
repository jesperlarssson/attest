"use client";

import React, { useEffect, useState } from "react";
import { useTableSettings } from "@/hooks/useTableSettings";
import toast from "react-hot-toast";
import axios from "axios";

interface ApiUser {
  ZZUSID: string;
  ZDCONO: string;
  ZDDIVI: string;
  ZDFACI: string;
  ZZWHLO: string;
  ZDAUPF: string;
  ZDREPF: string;
  ZDLANC: string;
  ZDDTFM: string;
  DSEP: string;
  TSEP: string;
  TIZO: string;
  USFN: string;
}

const formatDateAndTime = (date: string, time: string) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const hour = time.substring(0, 2);
  const minute = time.substring(2, 4);
  const second = time.substring(4, 6);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const SettingsContent = () => {
  const { tableSpec, toggleColumnActive } = useTableSettings();
  const [connectionLoading, setConnectionLoading] = useState<boolean>(false);
  const [serverTime, setServerTime] = useState<string>();
  const [apiUser, setApiUser] = useState<ApiUser | null>();

  const checkM3ServerTime = async () => {
    try {
      const response = await axios.get("/api/infor/getServerTime");
      const record = response.data;
      setServerTime(formatDateAndTime(record.DATE, record.TIME));
    } catch (error: any) {
      setServerTime("Failed");
      toast.error(error.message);
    }
  };

  const checkM3ApiUser = async () => {
    try {
      const response = await axios.get("/api/infor/getUserInfo");
      const record = response.data;
      setApiUser(record);
    } catch (error: any) {
      setApiUser(null);
      toast.error(error.message);
    }
  };

  const checkM3Connection = async () => {
    setConnectionLoading(true);
    try {
      checkM3ServerTime();
      checkM3ApiUser();
    } catch (error) {
    } finally {
      setConnectionLoading(false);
    }
  };

  useEffect(() => {
    checkM3Connection();
  }, []);

  return (
    <div className="container w-full mt-4">
      <div className="mb-10">
        <h3 className="text-lg leading-6 font-medium  mb-4">M3 Connection</h3>
        <div className="shadow overflow-hidden rounded-md">
          {serverTime && (
            <div className="px-4 py-5 bg-card-light dark:bg-card-dark border border-edge-light dark:border-edge-dark space-y-6 sm:p-6">
              {apiUser && (
                <div className="flex flex-col gap-4">
                  <p>{`UserID: ${apiUser.ZZUSID}`}</p>
                  <p>{`Company: ${apiUser.ZDCONO}`}</p>
                  <p>{`Division: ${apiUser.ZDDIVI}`}</p>
                  <p>{`Facility: ${apiUser.ZDFACI}`}</p>
                  <p>{`Name: ${apiUser.USFN}`}</p>
                </div>
              )}
              <div className="flex text-lg gap-4">
                <span className=" font-bold tracking-wide">Server time:</span>
                <span className="">{serverTime}</span>
                <button
                  disabled={connectionLoading}
                  onClick={checkM3Connection}
                  className="text-sm px-2 py-1 bg-blue-400 hover:bg-blue-500 rounded-sm"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
