const puppeteer = require('puppeteer');
const moment = require('moment');

const points = [
    ['Akamai', '50.020709:19.896879'],
    ['Ericsson', '50.089127:19.946378']
];

const callJakDojade = async (browser, target, pt) => {
    const page = await browser.newPage();
    let minDuration = Infinity; 
    page.on('requestfinished', async r => {
        if (r.url() === 'https://jakdojade.pl/api/jd/v1/routes') {
            const result = await r.response().json();
            for (const route of result.routes) {
                const start = route.routeParts[0].startDeparture.dateTime;
                const end = route.routeParts[route.routeParts.length - 1].targetArrival.dateTime;
                const duration = moment.duration(moment(end).diff(moment(start))).asMinutes();
                if (duration < minDuration) {
                    minDuration = duration;
                }
            }
        }
    });
    await page.goto(`https://jakdojade.pl/krakow/trasa/z--undefined--do--undefined?fc=${target}&tc=${pt}&ft=LOCATION_TYPE_COORDINATE&tt=LOCATION_TYPE_COORDINATE&d=03.07.19&h=07:30&aro=1&t=1&rc=3&ri=1&r=0`);
    return minDuration;
};

const getPoint = async pt => {
    const browser = await puppeteer.launch();
    const results = await Promise.all(points.map(([ name, target ]) => callJakDojade(browser, target, pt)));
    await browser.close();
    return results;
};

(async () => {
    const pt = process.argv.slice(-2).map(v => v.replace(/,$/, '')).join(':');
    const pts = await getPoint(pt);
    for (let i = 0; i < points.length; ++i) {
        console.log(`Czas dojazdu do ${points[i][0]}: ${[pts[i]]} min.`);
    }
})();
