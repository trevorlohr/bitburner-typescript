import { NS } from "@ns";

//Master runs this to ensure nodes are hacked, running latest scripts on best targets
import { Node } from "./Node";
import { getNumOfThreadsPerTarget, runHack } from "hackutility.js";
export async function main(ns: NS) {
  const allNodes: Node[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const targets = ns.read("targets.txt").split(",");
    init();
    const numOfTargets = targets.length ;
    for (const target of targets) {
      for (const node of allNodes) {
        if (
          node.name=== "home" ||
          node.name.startsWith("Hack") ||
          ns.isRunning("node-hack.js", node.name, target)
        ) {
          continue;
        }

        if (ns.hasRootAccess(node.name)) {
          node.threadsPerTarget = getNumOfThreadsPerTarget(
            ns,
            node.name,
            numOfTargets,
            "node-hack.js"
          );
          if (node.threadsPerTarget  < 1){
            continue;
          }
          else{
            await runHack(
              ns,
              "node-hack.js",
              node.name,
              node.threadsPerTarget,
              target
            );
          }
        }
        else{
          await ns.scp("node-hack.js",node.name);
        }
      }
      await ns.sleep(20000);
    }
  }


  function init() {
    const foundNodes = ns.read("foundnodes.txt");
    for (const node of foundNodes.split(",")) {
      const totalRam = ns.getServerMaxRam(node);
      const targets = ns.read("targets.txt");
      const numOfTargets = targets.split(",").length


      const numOfThreadsPerTarget = getNumOfThreadsPerTarget(
        ns,
        node,
        numOfTargets,
        "node-hack.js"
      );
      const newNode = new Node(node, totalRam, numOfThreadsPerTarget);
      allNodes.push(newNode);
    }
  }
}
