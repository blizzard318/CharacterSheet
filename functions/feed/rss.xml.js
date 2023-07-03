function GetKV (ctx) {
	switch (ctx.params.params[0]) {
		case "Pathfinder1": return ctx.env.Pathfinder1;
		case "Pathfinder2": return {};
	}
}

export function onRequestGet(context) {
	let text = '<?xml version="1.0" encoding="UTF-8"?>\n';
	text += '<rss version="2.0">\n<channel>\n';
	
	text += '<title>IceCubez Character Sheets</title>\n';
	text += '<description>This is to track when characters are updated.</description>\n';
	text += '<language>en-us</language>\n';
	text += '<link>https://charactersheet.pages.dev/</link>\n';
	text += '<lastBuildDate>Mon, 03 Jul 2023 03:30:00 SGT</lastBuildDate>\n';
	text += '<managingEditor>anew318@hotmail.com (Andrew)</managingEditor>\n';
	text += '<webMaster>anew318@hotmail.com (Andrew)</webMaster>\n';
	
	text += '<item>\n';
	text += ' <title>First entry</title>\n';
	text += ' <description>This is more an experiment than something useful.</description>\n';
	text += ' <pubDate>Mon, 03 Jul 2023 03:30:00 SGT</pubDate>\n';
	text += '</item>\n';

	text += '</channel>\n</rss>\n';
	
	return new Response(text, {
		status: 200,
		headers: {
			"content-type": "application/rss+xml;charset=UTF-8",
		},
	});
}