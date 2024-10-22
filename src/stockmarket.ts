// import { NS } from "@ns";

// export async function main(ns: NS){
//     const MONEY_THRESH = 500000000000;
//     const MAXSHARES = 1000000;
//     const getMyCash = () => {return ns.getServerMoneyAvailable("home")};
//     const symbols = ["ECP", "MGCP", "BLD", "CLRK", "OMTK", "FSIG", "KGI", "FLCM", "STM", "DCOMM", "HLS", "VITA", "ICRS", "UNV", "AERO", "OMN", "SLRS", "GPH", "NVMD", "WDS", "LXO", "RHOC", "APHE", "SYSC", "CTK", "NTLK", "OMGA", "FNS", "SGC", "JGN", "CTYS", "MDYN", "TITN"];
//     // eslint-disable-next-line no-constant-condition
//     while(true){
//         let totalStock = 0;
//         for(const sym of symbols){
//             const myCash = getMyCash();
//             const price = ns.getStockPrice(sym);
//             let pos = ns.getStockPosition(sym);
            
//             const myShares = pos[0];
//             const myAvgPrice = pos[1];
//             // if(myCash < MONEY_THRESH){
//             //     ns.exit();
//             // }
            
//             if(myAvgPrice * 1.10 < price && myShares > 0){
//                 ns.sellStock(sym,myShares);
//             }
//             if((myAvgPrice * .9 > price && myShares > 0) || myShares === 0){
//                 const numToBuy = MAXSHARES - myShares;
//                 if(numToBuy * price < getMyCash() - MONEY_THRESH){
//                     ns.buyStock(sym,numToBuy);
//                 }
//             }
//             pos = ns.getStockPosition(sym)[0];
//             totalStock = (pos * price) + totalStock
//         }
//         ns.print(`Total in stocks is ${totalStock}.`)
//         await ns.sleep(5000);
//     }
// }