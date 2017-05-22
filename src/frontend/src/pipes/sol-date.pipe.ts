import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'soldate' })
export class SolDatePipe implements PipeTransform {
    transform(date: Date): string {
        if (!date)
            return null;
        return Convert2Ls(date).toString();
    }
}

// From http://jtauber.github.io/mars-clock/
function Convert2Ls(date: Date): number {
    // Difference between TAI and UTC. This value should be
    // updated each time the IERS announces a leap second.
    // Last update on 2017 January 1st.
    var tai_offset = 37;
    var millis = date.getTime();
    var jd_ut = 2440587.5 + (millis / 8.64E7);
    var jd_tt = jd_ut + (tai_offset + 32.184) / 86400;
    var j2000 = jd_tt - 2451545.0;
    var msd = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096);

    return msd;
}