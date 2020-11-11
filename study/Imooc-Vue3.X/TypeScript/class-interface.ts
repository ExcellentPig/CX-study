interface Radio {
	switchRadio(trigger: boolean): void; //void不返回
}

interface Battery {
	checkBatteryStatus(): void;
}

interface RadionWithBattery extends Radio {
	checkBatteryStatus(): void;
}

class Car implements Radio {
	switchRadio(trigger: boolean) {
		
	}
}

// class Cellphone implements Radio,Battery {
// 	switchRadio(trigger: boolean) {
		
// 	}
// 	checkBatteryStatus() {
		
// 	}
// }

class Cellphone implements RadionWithBattery {
	switchRadio(trigger: boolean) {
		
	}
	checkBatteryStatus() {
		
	}
}