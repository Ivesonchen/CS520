function PriorityQueue() {
        
        var items = [];

        //需要插入队列的元素（该元素为对象，包括值和优先级）
		// function QueueElement(clock, event, stopN, busN) {
		// 	this.clock = clock;
		// 	this.event = event;
		// 	this.stopN = stopN;
		// 	this.busN = busN;
		// }
		var queueElement = [];


        //插入元素到队列中的方法
        this.enqueue = function (queueElement) {
            //需要插入队列的元素
            // var queueElement = new QueueElement(clock,event,stopN,busN);

            if(this.isEmpty()) {
                //当队列为空时，直接往队列中添加元素
                items.push(queueElement);
            }else{
                //当队列不为空时，遍历队列中的元素，当需要添加的元素的优先级小于（队列中）当前元素的优先级，就把该元素插入到当前元素之前
                var added = false;
                for(var i = 0; i < items.length; i++){
                    if(queueElement.clock < items[i].clock) {
                        items.splice(i, 0, queueElement);
                        added = true;
                        break;//终止队列循环
                    }
                }
                //当需要添加的元素的优先级比队列中任何一个元素的优先级都要高时，把该元素插入到队列的末尾
                if(!added){
                    items.push(queueElement);
                }
            }
        }

        //查看队列是否为空，如果为空，返回true；否则返回false
        this.isEmpty = function() {
            return items.length == 0;
        }    

        //查看队列
        this.print = function() {
            return items;
        }
		
		this.deq = function(){
			items.shift();
		}
		
		this.peek = function(){
			if(this.isEmpty()){
				console.log("Simulation compelete");
			}else{
				return items[0];
			}
		}
    }

    var priorityQueue = new PriorityQueue();
    
    priorityQueue.enqueue({clock:0,event:"person",stopN:1,busN:0});
    priorityQueue.enqueue({clock:2,event:"person1",stopN:1,busN:0});
	
    priorityQueue.enqueue({clock:1,event:"person2",stopN:1,busN:0});
    priorityQueue.enqueue({clock:1,event:"person3",stopN:1,busN:0});
	
    // priorityQueue.enqueue('Learning', 2);
    // priorityQueue.enqueue('JavaScript', 8);
    // priorityQueue.enqueue('Algorithms', 20);
    // priorityQueue.enqueue('Data Structures', 20);

// console.log(priorityQueue.peek().clock);

    console.log(priorityQueue.print());