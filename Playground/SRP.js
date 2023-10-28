//Single Responsibility Principle
const f = require('fs');
class Journal{
    constructor(){
        this.entries ={};
    }
    addJournal(text){
        const index = ++Journal.count;
        const content = `${index}: ${text}`;
        this.entries[index] = content;
        return index;
    }
    removeJournal(index){
        delete this.entries[index];
    }
    toString(){
        return Object.values(this.entries).join('\n');
    }
    // saveToFile(filename, journal){
    //     f.writeFileSync(filename,journal.toString());
    // }
}
class PersistenseManager {
    saveToFile(filename, journal){
            f.writeFileSync(filename,journal.toString());
     }
}
Journal.count = 0;
const j = new Journal();
j.addJournal("I am Rajesh Babu.");
j.addJournal("I am Suresh.");
j.addJournal("I am Mahesh.");

const p = new PersistenseManager();
p.saveToFile("C:\\Users\\rpola\\OneDrive\\Desktop\\abc.txt",j);

console.log(j.toString());