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
	text += '<title>RSS Title</title>';
	text += '<description>This is an example of an RSS feed</description>';
	text += '<link>http://www.example.com/main.html</link>';
	text += '<copyright>2020 Example.com All rights reserved</copyright>';
	text += '<lastBuildDate>Mon, 6 Sep 2010 00:01:00 +0000</lastBuildDate>';
	text += '<pubDate>Sun, 6 Sep 2009 16:20:00 +0000</pubDate>';
	text += '<ttl>1800</ttl>';

	text += '<item>';
	text += ' <title>Example entry</title>';
	text += ' <description>Here is some text containing an interesting description.</description>';
	text += ' <link>http://www.example.com/blog/post/1</link>';
	text += ' <guid isPermaLink="false">7bd204c6-1655-4c27-aeee-53f933c5395f</guid>';
	text += ' <pubDate>Sun, 6 Sep 2009 16:20:00 +0000</pubDate>';
	text += '</item>';

	text += '</channel>';
	text += '</rss>';
	
	return new Response(text, {status: 200})
}

