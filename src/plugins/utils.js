const timeDiff = (start_date, end_date) => {
  return Math.abs(
    new Date(end_date).getTime() - new Date(start_date).getTime()
  );
};

const dayDiff = (timeDiff) => {
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const calculateDay = (units) => {
  if (Array.isArray(units)) {
    units.map((unit) => {
      unit.day = dayDiff(timeDiff(unit.start_date, unit.end_date));
    });
    return units;
  } else {
    units.day = dayDiff(timeDiff(units.start_date, units.end_date));
    return units;
  }
};
