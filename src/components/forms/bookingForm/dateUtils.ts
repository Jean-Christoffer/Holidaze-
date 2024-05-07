import {
    format,
    isAfter,
    isBefore,
    isToday,
    differenceInCalendarDays,
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addMonths,
    addDays,
} from "date-fns";
import type { Booking, DayInfo } from "../../../types/types.ts";

export function calculateBookedDates(bookingData: Booking[]): string[] {
    return bookingData.flatMap((d) => {
        const start = new Date(d.dateFrom);
        const end = new Date(d.dateTo);
        let days: string[] = [];

        for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            days.push(format(dt, "yyyy-MM-dd"));
        }

        return days;
    });
}

export function getDaysArray(
    currentDate: Date,
    bookedDates: string[],
    startDate: Date | undefined,
    endDate: Date | undefined
): DayInfo[] {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd,
    }).map((day): DayInfo => {
        const formattedDate = format(day, "yyyy-MM-dd");
        return {
            date: day,
            formatted: formattedDate,
            isSelected:
                (startDate && format(startDate, "yyyy-MM-dd") === formattedDate) ||
                (endDate && format(endDate, "yyyy-MM-dd") === formattedDate),
            isInRange:
                startDate &&
                endDate &&
                isAfter(day, startDate) &&
                isBefore(day, endDate),
            isDisabled:
                isBefore(day, new Date()) ||
                (isToday(day) && format(new Date(), "yyyy-MM-dd") !== formattedDate) ||
                bookedDates.includes(formattedDate),
        };
    });
}

export function selectDate(
    date: Date,
    bookedDates: string[],
    startDate: Date | undefined,
    endDate: Date | undefined
): { startDate: Date | undefined; endDate: Date | undefined; valid: boolean } {
    let newStartDate = startDate;
    let newEndDate = endDate;
    let valid = true;

    if (!startDate || (startDate && endDate)) {
        newStartDate = date;
        newEndDate = undefined;
    } else if (startDate && isAfter(date, startDate)) {
        newEndDate = date;
    } else {
        newEndDate = startDate;
        newStartDate = date;
    }

    if (newStartDate && newEndDate) {
        let testDate = newStartDate;
        while (
            isBefore(testDate, newEndDate) ||
            format(testDate, "yyyy-MM-dd") === format(newEndDate, "yyyy-MM-dd")
        ) {
            if (bookedDates.includes(format(testDate, "yyyy-MM-dd"))) {
                valid = false;
                break;
            }
            testDate = addDays(testDate, 1);
        }
    }

    return { startDate: newStartDate, endDate: newEndDate, valid };
}
export function calculateDaysBetween(
    startDate: Date | undefined,
    endDate: Date | undefined
): number {
    if (startDate && endDate) {
        return differenceInCalendarDays(endDate, startDate);
    }
    return 0;
}

export function changeMonth(currentDate: Date, offset: number): Date {
    return addMonths(currentDate, offset);
}
