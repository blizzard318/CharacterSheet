function GetKV (ctx) {
	switch (ctx.params.params[0]) {
		case "Pathfinder1": return ctx.env.Pathfinder1;
		case "Pathfinder2": return {};
	}
}

export function onRequestGet(context) {
	let text = '<?xml version="1.0" encoding="UTF-8"?>';
	text += '<rss version="2.0">';
	text += '<channel>';
	text += '<title>IceCubez Character Sheets</title>';
	text += '<description>This is to track when characters are updated.</description>';
	text += '<language>en-us</language>';
	text += '<link>https://charactersheet.pages.dev/</link>';
	text += '<lastBuildDate>Mon, 3 Jul 2023 03:30:00 SGT</lastBuildDate>';
	text += '<managingEditor>anew318@hotmail.com</managingEditor>';
	text += '<webMaster>anew318@hotmail.com</webMaster>';
	
	text += '<item>';
	text += ' <title>First entry</title>';
	text += ' <description>This is more an experiment than something useful.</description>';
	text += ' <pubDate>Mon, 3 Jul 2023 03:30:00 SGT</pubDate>';
	text += '</item>';

	text += '</channel>';
	text += '</rss>';
	
	return new Response(text, {status: 200})
}

