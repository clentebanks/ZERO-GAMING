export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  try {
    // Buscar stream en vivo
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
    );
    const searchData = await searchRes.json();

    if (!searchData.items.length) {
      return res.status(200).json({
        live: false
      });
    }

    const videoId = searchData.items[0].id.videoId;

    // Obtener datos del stream
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${API_KEY}`
    );
    const videoData = await videoRes.json();
    const details = videoData.items[0];

    res.status(200).json({
      live: true,
      title: details.snippet.title,
      viewers: details.liveStreamingDetails.concurrentViewers || 0,
      startedAt: details.liveStreamingDetails.actualStartTime
    });

  } catch (err) {
    res.status(500).json({ error: "YouTube API error" });
  }
}
