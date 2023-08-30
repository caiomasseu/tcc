export class Pair{
    constructor(index,value) {
        // super(props);
        this.index= index;
        this.value = value;

       this.compareTo = this.compareTo.bind(this);
       
     }
 
     compareTo( o) {
        const d = this.value - o.value;            
        return Math.signum(d);
    }
    
   
}//class
