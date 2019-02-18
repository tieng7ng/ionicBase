export class Appareil {
  
  description: string[];
  isOn: boolean;
  startTime: string;
  endTime: string;

  constructor(public name: string) {
    this.description = [];
    this.isOn = false;
    this.startTime = '';
    this.endTime = '';
  }
  
}