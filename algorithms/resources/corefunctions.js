/*
    * A simple FIFO queue for use with search algorithm.
    * 
    * Logic and names modeled after psuedocode used in AI: A Modern Approach, 4th Edition
    */
class FIFOQueue {
    constructor() {
        this.nodes = {};
        this.head = 0;
        this.tail = 0;
    }
    add(node) {
        this.nodes[this.tail] = node;
        this.tail++;
    }
    pop() {
        const node = this.nodes[this.head];
        delete this.nodes[this.head];
        this.head++;
        return node;
    }
    length() {
        return this.tail - this.head;
    }
    isEmpty() {
        return this.length === 0;
    }
}
/*
    *  A problem that expresses a search problem that can solved with a search algorthm
    * 
    *  Logic and names modeled after psuedocode used in AI: A Modern Approach, 4th Edition
    */           
class SearchProblem {
    constructor(startnode, goalstate) {
        this.startnode = startnode;
        this.goal_state = goalstate;
    }
    isGoal(current_state){
        return current_state == this.goal_state;
    }
    getInitial(){
        return this.startnode;
    }
}

/*
    * A node used for navigation problems which may or may not take weight into account
    */
class TravelNode {
    constructor(myName, myHistory, myMap){
        this.name = myName
        this.children = {}
        this.history = myHistory;
        this.map = myMap;
    }
    getState(){
        return this.name;
    }
    getChildren(){
        let children_names = this.map[this.name];
        let ret = [];
        for (let child_name in children_names){
            let new_history = this.history.slice();
            new_history.push(children_names[child_name]);
            let new_child = new TravelNode(children_names[child_name][0], new_history, this.map);
            ret.push(new_child);
        }
        return ret;
    }
    setHistory(toAdd){
        this.history.append(toAdd);
    }
}

class BreadthFirstSearch {
    findSolution(problem){
        let node = problem.getInitial();
        if(problem.isGoal(node.getState())){
            return [node,steps];
        }
        let reached = [node.getState()];
        let frontier = new FIFOQueue();
        frontier.add(node);
        while (!frontier.isEmpty()){
            node = frontier.pop();
            let children = node.getChildren();
            for (let child in children){
                let s = children[child].getState();
                if(problem.isGoal(s)){
                    return [children[child],steps];
                } else {
                    if(reached.indexOf(s) == -1){
                        reached.push(s);
                        frontier.add(children[child]);
                    }
                }

            }
        }
    }
    findSolutionVerbose(problem){
        let steps = [];
        steps.push([2]);
        let node = problem.getInitial();
        if(problem.isGoal(node.getState())){
            steps.push([3, node.getState()]);
            return [node,steps];
        }
        let reached = [node.getState()];
        steps.push([4, node.getState()]);
        let frontier = new FIFOQueue();
        steps.push([5, node.getState()]);
        frontier.add(node);
        while (!frontier.isEmpty()){
            node = frontier.pop();
            steps.push([7, node.getState()]);
            let children = node.getChildren();
            steps.push([8,node.getState()]);
            for (let child in children){
                let s = children[child].getState();
                if(problem.isGoal(s)){
                    steps.push([10,node.getState()]);
                    return [children[child],steps];
                } else {
                    steps.push([11, s]);
                    if(reached.indexOf(s) == -1){
                        steps.push([12, s]);
                        reached.push(s);
                        frontier.add(children[child]);
                    }      
                }

            }
        }
    }
}

function updateToStep(isteps,icurrentStep,iPSteps,icurrentNode, icurrentFrontier, icurrentReached, retString=false){
    ret = ''
    let stepnum = isteps[icurrentStep][0];
    if(stepnum == 2){
        ret = '<div>' + icurrentStep + ': Node has been initialized</div>';
        icurrentNode[0] = '';
    } else if(stepnum == 3){
        ret = '<div>' + icurrentStep + ': Path found: ' + isteps[icurrentStep][1] + ' the same as goal</div>';
    } else if(stepnum == 4){
        ret = '<div>' + icurrentStep + ': frontier initialized with ' + isteps[icurrentStep][1] + ' in queue</div>';
        icurrentFrontier.push(isteps[icurrentStep][1] );
    } else if(stepnum == 5){
        ret = '<div>' + icurrentStep + ': reached initialized with ' + isteps[icurrentStep][1] + ' on list</div>';
        icurrentReached.push(isteps[icurrentStep][1]);
    } else if(stepnum == 7){
        ret = '<div>' + icurrentStep + ': ' + isteps[icurrentStep][1] + ' transfered from frontier to node</div>';
        icurrentFrontier.shift();
        icurrentNode[0] = isteps[icurrentStep][1];
    } else if(stepnum == 8){
        ret = '<div>' + icurrentStep + ': Children of ' + isteps[icurrentStep][1] + ' are now being inspected</div>';
    } else if(stepnum == 10){
        ret = '<div>' + icurrentStep + ': Path found: ' + isteps[icurrentStep][1] + ' is the goal. Returning lineage of node.</div>';
    } else if(stepnum == 11){
        ret = '<div>' + icurrentStep + ': Child ' + isteps[icurrentStep][1] + ' is not the goal. Adding to frontier if reached.</div>';
    } else if(stepnum == 12){
        ret = '<div>' + icurrentStep + ': ' + isteps[icurrentStep][1] + ' not on reached list. Adding to reached list and frontier queue</div>';
        icurrentFrontier.push(isteps[icurrentStep][1]);
        icurrentReached.push(isteps[icurrentStep][1]);
    }
    if (retString){
        return ret;
    } else {
        iPSteps.innerHTML = ret + iPSteps.innerHTML;
    }
}

function updateNodeLists(icurrentFrontier, icurrentReached, icurrentNode, iPReached, iPFrontier, iDNode){
    iPReached.innerHTML = '';
    for(let reachNum in icurrentReached){
        iPReached.innerHTML += '<div class="griditem">' + icurrentReached[reachNum] + '</div>';
    }
    iPFrontier.innerHTML = '';
    for(let frontierNum in icurrentFrontier){
        iPFrontier.innerHTML += '<div class="griditem">' + icurrentFrontier[frontierNum] + '</div>';
    }
    iDNode.innerHTML = '<h3>Current Node: ' + icurrentNode[0] + '</h3>';
}
