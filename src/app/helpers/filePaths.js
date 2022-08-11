export class FilePaths {
    static stocklocation (stocklocationId) {
        return `uploads/${stocklocationId}`;
    }

    static itemFiles (stocklocationId, itemID) {
        return `${this.stocklocation(stocklocationId)}/${itemID}`;
    }

    static artisanFiles (artisanID) {
        return `uploads/artisans/${artisanID}`;
    }

    static equipFiles (stocklocationId, equipID) {
        return `${this.stocklocation(stocklocationId)}/${equipID}`;
    }
}
