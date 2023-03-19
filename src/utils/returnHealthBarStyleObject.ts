import { Unit } from "../types";

export function returnHealthBarStyleObject(unit: Unit) {
  let healthWidth, healthBarColor;
  const percentHealth = (unit.currentHealth / unit.maxHealth) * 100;
  if (percentHealth === 0) {
    healthWidth = "w-0";
  } else if (percentHealth <= 5) {
    healthWidth = "w-[5%]";
  } else if (percentHealth <= 10) {
    healthWidth = "w-[10%]";
  } else if (percentHealth <= 20) {
    healthWidth = "w-[20%]";
  } else if (percentHealth <= 30) {
    healthWidth = "w-[30%]";
  } else if (percentHealth <= 40) {
    healthWidth = "w-[40%]";
  } else if (percentHealth <= 50) {
    healthWidth = "w-[50%]";
  } else if (percentHealth <= 60) {
    healthWidth = "w-[60%]";
  } else if (percentHealth <= 70) {
    healthWidth = "w-[70%]";
  } else if (percentHealth <= 80) {
    healthWidth = "w-[80%]";
  } else if (percentHealth <= 90) {
    healthWidth = "w-[90%]";
  } else if (percentHealth < 100) {
    healthWidth = "w-[95%]";
  } else healthWidth = "w-[100%]";

  if (percentHealth <= 25) {
    healthBarColor = "bg-red-700";
  } else if (percentHealth <= 50) {
    healthBarColor = "bg-red-400";
  } else if (percentHealth <= 75) {
    healthBarColor = "bg-orange-400";
  } else {
    healthBarColor = "bg-green-400";
  }
  const healthBarStyle = { healthWidth, healthBarColor };
  return healthBarStyle;
}
