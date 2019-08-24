function PlanSummary(originCode, destinationCode, totalMinutes, planName, planPrice, regularPrice) {
    this.originCode = originCode;
    this.destinationCode = destinationCode;
    this.totalMinutes = totalMinutes;
    this.planName = planName;
    this.planPrice = planPrice;
    this.regularPrice = regularPrice;
}

module.exports = PlanSummary;