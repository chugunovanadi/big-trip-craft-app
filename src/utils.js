import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(duration);
dayjs.extend(utc);

const formatEventDuration = (start, end) => {
  const diff = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();

  let formattedDiff = '';
  if (days > 0) {formattedDiff += `${days}D `;}
  if (hours > 0 || days > 0) {formattedDiff += `${hours}H `;}
  formattedDiff += `${minutes}M`;

  return formattedDiff.trim();
};

const humanizeEventFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeEventDateDay = (date) => dayjs(date).format('MMM DD').toUpperCase();
const humanizeEventDateTime = (date) => dayjs(date).format('HH:mm');


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length-1);
  return items[randomIndex];
};

const getRandomBoolean = () => Math.random() < 0.5;

const isDestinationEmpty = (point) => point.destination.description;
const isOffersEmpty = (offersByType) => !(offersByType.offers.length === 0);

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
const sortByTime = (pointA, pointB) => (dayjs.duration(dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)))) - (dayjs.duration(dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo))));

export {sortByDay, sortByPrice, sortByTime, updateItem, isDestinationEmpty, isOffersEmpty, getRandomInteger, getRandomValue, getRandomBoolean, formatEventDuration, humanizeEventFullDate, humanizeEventDateDay, humanizeEventDateTime};
