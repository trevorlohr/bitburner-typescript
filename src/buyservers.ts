/* eslint-disable prefer-spread */
import { NS } from "@ns";
import { Server } from "./Server";
const maxRam = 1048576; 


export async function main(ns: NS) {
  const moneyCheck = (gb: number, num=1): number => {
    if( gb < 64){
      ns.exit();
      return 0;
    }

    if(((ns.getServerMoneyAvailable("home") - SAFETY_THRESH) % (num * gb * 55000)) > 0){
      return gb
    }
    else{
      return moneyCheck(gb/2)
    }
  };

  const SAFETY_THRESH = 100;

  if( moneyCheck(64) === 0 ){ns.exit()}
  const servers = ns.getPurchasedServers();
  const mapServers: Server[] = [];
  servers.forEach(server => {
    mapServers.push(new Server(server, ns.getServerMaxRam(server), 0))
  });
  
  // if(mapServers.length === 0){
  //   ns.purchaseServer("Hack",64);
  //   return;
  // }

  const topGB = moneyCheck(maxRam);

  const findNumToBuy = (list: Server[])=>list.filter((x: Server) => x.totalRam < topGB);
  const sellTheseServers: Server[] = findNumToBuy(mapServers);

  if (moneyCheck(topGB, sellTheseServers.length) >= topGB){
    sellTheseServers.forEach(eachServer => {
      ns.deleteServer(eachServer.name);
      ns.purchaseServer(eachServer.name, topGB);
    });
  }
  // if(numToBuy.length === 0 && mapServers.length === 25){
    
  // if(numToBuy.length === 0 || numOfServers < 25){
}