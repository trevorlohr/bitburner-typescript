import { NS } from "@ns";
import { Node } from "./Node";

export async function main(ns: NS) {
  const foundnodes: string[] = [];
  const origin = ns.getHostname();
  const stack: string[] = [];
  stack.push(origin);
  let crackedServers = [];
  const MONEY_THRESH = 0;

  async function crackNode (node: Node) {
    await ns.scp("node-hack.js",node.name);

    if (ns.fileExists("httpworm.exe")) {
      ns.httpworm(node.name);
    }
    if (ns.fileExists("sqlinject.exe")) {
      ns.sqlinject(node.name);
    }
    if (ns.fileExists("relaysmtp.exe")) {
      ns.relaysmtp(node.name);
    }
    if (ns.fileExists("ftpcrack.exe")) {
      ns.ftpcrack(node.name);
    }
    if (ns.fileExists("brutessh.exe")) {
      ns.brutessh(node.name);
    }
    ns.nuke(node.name);
  }

  while (stack.length > 0) {
    const node: string = stack.pop() ?? "bad error";
    if (foundnodes.includes(node)) {
      //Do nothing => "continue"
    } else {
      foundnodes.push(node);

      const nextNodes = ns.scan(node);
      for (let i = 0; i < nextNodes.length; ++i) {
        stack.push(nextNodes[i]);
      }
    }
  }
  for (const node of foundnodes) {
    if (
      ns.getServerMaxMoney(node) > MONEY_THRESH &&
      ns.getServerRequiredHackingLevel(node) <= ns.getHackingLevel()
    ) {
      const crackThisNode = new Node(node, ns.getServerMaxRam(node),0 )
      crackNode(crackThisNode);
      crackedServers.push(node);
    }
  }
  const maxMoney = [];
  for (const each of crackedServers) {
    const money = ns.getServerMaxMoney(each);
    if (ns.getServerRequiredHackingLevel(each) <= ns.getHackingLevel() && ns.hasRootAccess(each)) {
      maxMoney.push({ name: each, maxMoney: money });
    }
  }

  crackedServers = maxMoney.sort((a, b) => {
    if (a.maxMoney < b.maxMoney) return -1;
    if (a.maxMoney > b.maxMoney) return 1;
    return 0;
  });
  if (maxMoney.length) {
         
    crackedServers = maxMoney.slice(-3).map(x => {
      return x.name;
    });
  }

  await ns.write("targets.txt", String(crackedServers), "w");
  await ns.write("foundnodes.txt", String(foundnodes), "w");
}
