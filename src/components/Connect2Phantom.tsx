
import { FC, useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useMediaQuery } from 'react-responsive';

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: ()=>Promise<void>;
    on: (event: PhantomEvent, callback: (args:any)=>void) => void;
    isPhantom: boolean;
}

type WindowWithSolana = Window & { 
    solana?: PhantomProvider;
}



const Connect2Phantom: FC = () => {

    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [ connected, setConnected ] = useState(false);
    const [ pubKey, setPubKey ] = useState<PublicKey | null>(null);


    useEffect( ()=>{
        if ("solana" in window) {
            const solWindow = window as WindowWithSolana;
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
                setWalletAvail(true);
                // Attemp an eager connection
                solWindow.solana.connect({ onlyIfTrusted: true });
            }
        }
    }, []);

    useEffect( () => {
        provider?.on("connect", (publicKey: PublicKey)=>{ 
            console.log(`connect event: ${publicKey}`);
            setConnected(true); 
            setPubKey(publicKey);
        });
        provider?.on("disconnect", ()=>{ 
            console.log("disconnect event");
            setConnected(false); 
            setPubKey(null);
        });

    }, [provider]);


    const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`connect handler`);
        provider?.connect()
        .catch((err) => { console.error("connect ERROR:", err); });
    }

    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("disconnect handler");
        provider?.disconnect()
        .catch((err) => {console.error("disconnect ERROR:", err); });
    }
    const IsPc = useMediaQuery({
        query : "(min-width : 1024px)"
    })

    const walletButtonPc={
        backgroundColor : '#00704A',
        color: 'white',
        textShadow : 'none',
        width:'300px',
        height:'50px',
        boxShadow:'5px 5px 5px gray'
        
      }
      const walletButtonMobile={
        backgroundColor : 'white',
        color: 'black',
        textShadow : '5px 5px 5px gray'
        
        
      }

    return (
        <div>
            { walletAvail ?
                <>
                <button style={IsPc?walletButtonPc:walletButtonMobile} disabled={connected} onClick={connectHandler}>Connect Wallet</button>
                 { connected ? <p>Your public key is : {pubKey?.toBase58()}</p> : null }
                </>
            :
                <>
                <button style={IsPc?walletButtonPc:walletButtonMobile} onClick={() => window.open('https://phantom.app/', '_blank')}>Connect Wallet</button>
                
                </>
            }
        </div>
    );
}

export default Connect2Phantom;