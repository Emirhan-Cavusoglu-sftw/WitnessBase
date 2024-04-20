"use client";

import { DynamicContextProvider, DynamicWidget , useDynamicContext} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useEffect, useState} from 'react';
import Provider from '../components/dy-provider';


export default function Home() {


  return (
    <DynamicContextProvider
    
    settings={{
      environmentId: 'b073a893-929a-4ff4-8bb6-7cd8c8db2721',
      walletConnectors: [ EthereumWalletConnectors ],
    }}>
       
    <DynamicWidget />
    <Provider/> 
    -------------------
    
    
  </DynamicContextProvider>
    
  );
}
//dyn_uB088sLpw4oW3VPqyDDteF1zv1kMXkYpe7JqMqsLPDRlEG2qJ03gqp13