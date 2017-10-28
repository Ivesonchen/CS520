/*
Make sure your computer has installed node.js.
Open the project directory in your Terminal or Cmd.
using this instruction: "node improvedbus.js" to run the program.
If you have trouble with running my program.Please contact me.
Name: Xiaoqian Chen
CWID: 10427052
*/
var stop_time = 8*60*60;
//The whole running time of this program.
var queue = new PriorityQueue();
// Create a priortyqueue to store there event and control the running procedure.

var leaveTime = ["A","B","C","D","E"];
// Create an array to store the leave action of the bus.

var waitPerson = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
waitPerson[1] = 1;
waitPerson[2] = 1;
waitPerson[3] = 1;
waitPerson[4] = 1;
waitPerson[5] = 1;
waitPerson[6] = 1;
waitPerson[7] = 1;
waitPerson[8] = 1;
waitPerson[9] = 1;
waitPerson[10] = 1;
waitPerson[11] = 1;
waitPerson[12] = 1;
waitPerson[13] = 1;
waitPerson[14] = 1;
waitPerson[15] = 1;
//Create an array to store the people waiting in all bus stop.

var busPosition = ["A","B","C","D","E"];

/*
carPosition stands for the bus' position.
eg. carPosition[1] = 1.2 means the bus is between stop 1 and stop 2.
	carPosition[5] = 15.4 means the bus is between stop 15 and stop 1.
*/
var carPosition = ["A", "B", "C", "D", "E"];
carPosition["A"] = 0;//1
carPosition["B"] = 0;//4
carPosition["C"] = 0;//7
carPosition["D"] = 0;//10
carPosition["E"] = 0;//13

/*
Initial status.
Bus A is at stop 1; Bus B is at stop 4; Bus C is at stop 7; Bus D is at stop 10; Bus E is at stop 13.
Enqueue all the event("person" and "arrival") at clock 0;
all the event will begin at time 0;
*/
queue.enq({clock:0,event:"person",stopN:1,busN:0});
queue.enq({clock:0,event:"person",stopN:2,busN:0});
queue.enq({clock:0,event:"person",stopN:3,busN:0});
queue.enq({clock:0,event:"person",stopN:4,busN:0});
queue.enq({clock:0,event:"person",stopN:5,busN:0});
queue.enq({clock:0,event:"person",stopN:6,busN:0});
queue.enq({clock:0,event:"person",stopN:7,busN:0});
queue.enq({clock:0,event:"person",stopN:8,busN:0});
queue.enq({clock:0,event:"person",stopN:9,busN:0});
queue.enq({clock:0,event:"person",stopN:10,busN:0});
queue.enq({clock:0,event:"person",stopN:11,busN:0});
queue.enq({clock:0,event:"person",stopN:12,busN:0});
queue.enq({clock:0,event:"person",stopN:13,busN:0});
queue.enq({clock:0,event:"person",stopN:14,busN:0});
queue.enq({clock:0,event:"person",stopN:15,busN:0});
queue.enq({clock:0,event:"arrival",stopN:1,busN:"A"});
queue.enq({clock:0,event:"arrival",stopN:4,busN:"B"});
queue.enq({clock:0,event:"arrival",stopN:7,busN:"C"});
queue.enq({clock:0,event:"arrival",stopN:10,busN:"D"});
queue.enq({clock:0,event:"arrival",stopN:13,busN:"E"});

/*
	Enqueue the showStatues event at the time you want to show the whole system status.
*/
queue.enq({clock:0,event:"showStatues"});
queue.enq({clock:1,event:"showStatues"});
queue.enq({clock:2,event:"showStatues"});
queue.enq({clock:3,event:"showStatues"});
queue.enq({clock:4,event:"showStatues"});
queue.enq({clock:5,event:"showStatues"});
queue.enq({clock:6,event:"showStatues"});
queue.enq({clock:100,event:"showStatues"});
queue.enq({clock:500,event:"showStatues"});
queue.enq({clock:1000,event:"showStatues"});
queue.enq({clock:2000,event:"showStatues"});
queue.enq({clock:3000,event:"showStatues"});


/*
	Processing all the event which stored in the priorityqueue follow the priority rule(clock).
*/
do {
	var currentTime = queue.peek().clock;
	var eventKind = queue.peek().event;
	if (eventKind == "showStatues") {
		showStatues();
		queue.deq();
	} else {
		var stopNumber = queue.peek().stopN;
		var busNumber = queue.peek().busN;
		queue.deq();
		switch (eventKind) {
			case "person":
				person(currentTime,stopNumber,busNumber);
				break;
			case "arrival":
				arrival(currentTime,stopNumber,busNumber);
				break;
			case "boarder":
				boarder(currentTime,stopNumber,busNumber);
				break;
		}
	}

} while (currentTime <= stop_time && !queue.isEmpty())

/*
	Update the waiting person number at specific bus stop.
	Generate the next person event at the same bus stop.
*/
function person(currentTime,stopNumber,busNumber){
	waitPerson[stopNumber] += 1;
	clockN = currentTime + 12 * randomTime();
	queue.enq({clock:clockN,event:"person",stopN:stopNumber,busN:busNumber});
}

/*
	Set leaveTime to record the leave status of all buses.
	if waiting person at this stop is 0, create the arrival event at next stop.
	if not, create boarder event at this stop every two seconds.
*/
/*
	Improved version:
	Change the condition which generate "arrival" event.
	There will be no waiting queue when all buses begin to move.
*/
function arrival(currentTime,stopNumber,busNumber){

	if(busNumber == "A"){
		leaveTime["A"] = {time:0,stopN:stopNumber};
	}else if(busNumber == "B"){
		leaveTime["B"] = {time:0,stopN:stopNumber};
	}else if(busNumber == "C"){
		leaveTime["C"] = {time:0,stopN:stopNumber};
	}else if(busNumber == "D"){
		leaveTime["D"] = {time:0,stopN:stopNumber};
	}else if(busNumber == "E"){
		leaveTime["E"] = {time:0,stopN:stopNumber};
	}
/*--------------------------changed part----------------------------------------*/
	busPosition[busNumber] = stopNumber;
	if(waitPerson[busPosition["A"]] == 0 
		&& waitPerson[busPosition["B"]] == 0 
		&& waitPerson[busPosition["C"]] == 0 
		&& waitPerson[busPosition["D"]] == 0 
		&& waitPerson[busPosition["E"]] == 0){
		clockN = currentTime + 5 * 60;
		if(stopNumber >= 15){
			stopNumber = 1;
		}else{
			stopNumber += 1;
		}
		queue.enq({clock:clockN,event:"arrival",stopN:stopNumber,busN:busNumber});
	}else{
		if(waitPerson[stopNumber] == 0){
			clockN = currentTime + 1;
			queue.enq({clock:clockN,event:"arrival",stopN:stopNumber,busN:busNumber});
		}else{
			clockN = currentTime + 2;
			queue.enq({clock:clockN,event:"boarder",stopN:stopNumber,busN:busNumber});
		}
	}
/*-----------------------------------------------------------------------------*/
	
}

/*
	if waiting person is 0, generate "arrival" event at next stop, and record the leave action.
	if not, generate "boarder" event every two seconds.
*/
function boarder(currentTime,stopNumber,busNumber){
	
/*--------------------------changed part----------------------------------------*/
	if(waitPerson[busPosition["A"]] == 0 
		&& waitPerson[busPosition["B"]] == 0 
		&& waitPerson[busPosition["C"]] == 0 
		&& waitPerson[busPosition["D"]] == 0 
		&& waitPerson[busPosition["E"]] == 0){
		clockN = currentTime + 5 * 60;
		if(busNumber == "A"){
			leaveTime["A"] = {time:currentTime,stopN:stopNumber};
		}else if(busNumber == "B"){
			leaveTime["B"] = {time:currentTime,stopN:stopNumber};
		}else if(busNumber == "C"){
			leaveTime["C"] = {time:currentTime,stopN:stopNumber};
		}else if(busNumber == "D"){
			leaveTime["D"] = {time:currentTime,stopN:stopNumber};
		}else if(busNumber == "E"){
			leaveTime["E"] = {time:currentTime,stopN:stopNumber};
		}
		
		if(stopNumber == 15){
			stopNumber = 1;
		}else{
			stopNumber += 1;
		}

		queue.enq({clock:clockN,event:"arrival",stopN:stopNumber,busN:busNumber});
	}else{
		if(waitPerson[stopNumber] == 0){
			clockN = currentTime + 1;
			queue.enq({clock:clockN,event:"boarder",stopN:stopNumber,busN:busNumber});
		}else{
		clockN = currentTime + 2;
		waitPerson[stopNumber] -= 1;
		queue.enq({clock:clockN,event:"boarder",stopN:stopNumber,busN:busNumber});
	}
	}
/*-----------------------------------------------------------------------------*/
	
}

/*
	This function is to show the whole system status at certain moment.
	It shows waiting person at each stop and location of each bus based on the record of each bus' leave action
*/
function showStatues(){
	console.log("-----------------------------------");
	console.log("Current time is " + currentTime);
	console.log("Statues in every stop");
	for(var i=1;i<=15;i++){
		console.log("Stop "+ i + " has "+ waitPerson[i] + " person.")
	}
	if(leaveTime["A"].time == 0){
		carPosition["A"] = leaveTime["A"].stopN;
	}else{
		carPosition["A"] = (currentTime - leaveTime["A"].time)/300 + leaveTime["A"].stopN;
	}
	
	if(leaveTime["B"].time == 0){
		carPosition["B"] = leaveTime["B"].stopN;
	}else{
		carPosition["B"] = (currentTime - leaveTime["B"].time)/300 + leaveTime["B"].stopN;
	}
	
	if(leaveTime["C"].time == 0){
		carPosition["C"] = leaveTime["C"].stopN;
	}else{
		carPosition["C"] = (currentTime - leaveTime["C"].time)/300 + leaveTime["C"].stopN;
	}
	if(leaveTime["D"].time == 0){
		carPosition["D"] = leaveTime["D"].stopN;
	}else{
		carPosition["D"] = (currentTime - leaveTime["D"].time)/300 + leaveTime["D"].stopN;
	}
	if(leaveTime["E"].time == 0){
		carPosition["E"] = leaveTime["E"].stopN;
	}else{
		carPosition["E"] = (currentTime - leaveTime["E"].time)/300 + leaveTime["E"].stopN;
	}
	
	console.log("Bus " + "A" + " positon is " + carPosition["A"].toFixed(2));
	console.log("Bus " + "B" + " positon is " + carPosition["B"].toFixed(2));
	console.log("Bus " + "C" + " positon is " + carPosition["C"].toFixed(2));
	console.log("Bus " + "D" + " positon is " + carPosition["D"].toFixed(2));
	console.log("Bus " + "E" + " positon is " + carPosition["E"].toFixed(2));


}

/*
	This function is not used in this program. But it can be useful at some time.
*/
function busSequence(){
	var bus = ["A","B","C","D","E"];
	this.initSequence = function(){
		bus["A"] = 0;
		bus["B"] = 0;
		bus["C"] = 0;
		bus["D"] = 0;
		bus["E"] = 0;
	}
	this.check = function(){
		if(bus["A"] - bus["B"] > 3)return 1;
		else if(bus["B"] - bus["C"] > 3)return 2;
		else if(bus["C"] - bus["D"] > 3)return 3;
		else if(bus["D"] - bus["E"] > 3)return 4;
		else if(bus["E"] - bus["A"] > 3)return 5;
		else return 0;
	}
	this.aMove = function(){
		bus["A"] += 1;
	}
	this.bMove = function(){
		bus["B"] += 1;
	}	
	this.cMove = function(){
		bus["C"] += 1;
	}
	this.dMove = function(){
		bus["D"] += 1;
	}
	this.eMove = function(){
		bus["E"] += 1;
	}
}

/*
	This function return a exponential random value. It's used to generate a person at random time.
*/
function randomTime() {
	var z;
	var x;
	var la = 2;

	z = Math.random(); //0~1
	x = -1 * Math.log(z);
	return x;
}

/*
	This function defines a priorityqueue to store the generated events.
	Also it helps to control the procdure of processing all the events.
*/
function PriorityQueue() {

	var items = [];


	var queueElement = [];

	this.enq = function(queueElement) {

		if (this.isEmpty()) {

			items.push(queueElement);
		} else {

			var added = false;
			for (var i = 0; i < items.length; i++) {
				if (queueElement.clock < items[i].clock) {
					items.splice(i, 0, queueElement);
					added = true;
					break; 
				}
			}
			if (!added) {
				items.push(queueElement);
			}
		}
	}

	this.isEmpty = function() {
		return items.length == 0;
	}

	this.print = function() {
		return items;
	}

	this.deq = function() {
		items.shift();
	}

	this.peek = function() {
		if (this.isEmpty()) {
			console.log("Simulation compelete");
		} else {
			return items[0];
		}
	}
}
