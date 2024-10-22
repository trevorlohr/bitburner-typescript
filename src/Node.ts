export class Node{
    name: string;
    totalRam: number;
    threadsPerTarget: number;
    constructor(name: string, totalRam: number, threadsPerTarget: number){
        this.name = name;
        this.totalRam = totalRam;
        this.threadsPerTarget = threadsPerTarget;
    }
    
}