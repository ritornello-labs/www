(function () {
  function gallery(title, slug, files, captions, release, badge) {
    var base = 'media/ankiweb/' + (release || '2026-07-31-v2') + '/';
    return {
      title: title,
      badge: badge,
      items: files.map(function (entry, index) {
        var file = typeof entry === 'string' ? entry : entry.file;
        var poster = typeof entry === 'string' ? null : entry.poster;
        var isVideo = file.endsWith('.mp4');
        return {
          type: isVideo ? 'video' : 'image',
          src: base + slug + '/' + file,
          poster: isVideo ? base + slug + '/' + (poster || 'gallery-' + String(index + 1).padStart(2, '0') + '.png') : undefined,
          caption: captions[index]
        };
      })
    };
  }

  function templateGallery(title, slug, templates, release) {
    var files = [];
    var captions = [];
    templates.forEach(function (template) {
      files.push({file: template.slug + '.mp4', poster: template.slug + '-front.png'});
      files.push(template.slug + '.png');
      captions.push(template.video);
      captions.push(template.still);
    });
    return gallery(title, slug, files, captions, release || '2026-09-23-v5', templates.length + ' templates');
  }

  window.ritornelloGalleries = {
    "chat-with-your-cards": gallery(
      "Chat With Your Cards",
      "chat-with-your-cards",
      ["explain-and-edit.gif", "filtered-deck.gif"],
      ["Type a question, watch the explanation stream, and accept an edit that updates the card front", "Type a filtered-deck request, review the streamed reply and proposal, then accept to gather five cards"],
      '2026-10-07-v7',
      '2 GIFs'
    ),
    "fractional-scheduler": gallery(
      "Fractional New-Card Scheduler",
      "fractional-scheduler",
      ["schedule.gif"],
      ["Preview a one-every-three-days schedule, then inspect the grouped-deck balance queue"],
      '2026-10-07-v7',
      '1 GIFs'
    ),
    'study-triage': gallery(
      'Study Triage',
      'study-triage',
      ['preview.gif', 'gallery-01.png', 'gallery-02.png'],
      [
        'Mute a crowded new-card tree for today without changing tomorrow’s limits.',
        'Start with new cards spread across a messy, expanded deck tree.',
        'See every affected deck muted after the temporary triage action.'
      ],
      '2026-09-30-v2',
      '3 samples'
    ),
    'geo-trainer': {
        "title": "GeoTrainer",
        "badge": "10 demos",
        "items": [
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/identify.gif",
                "caption": "Identify — Italy — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/place.gif",
                "caption": "Place — California — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/sketch.gif",
                "caption": "Sketch — France — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/draw.gif",
                "caption": "Draw — Maharashtra, India — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/membership.gif",
                "caption": "Select members — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/river.gif",
                "caption": "Trace a river — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/marshall-globe.gif",
                "caption": "Place an archipelago — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/reference-globe.gif",
                "caption": "Place a reference line — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/utc.gif",
                "caption": "Convert UTC and date — actual Anki practice."
            },
            {
                "type": "image",
                "src": "media/ankiweb/2026-10-05-v1/geo-trainer-full/biome.gif",
                "caption": "Recall a concept — actual Anki practice."
            }
        ]
    },
    "us-regions": gallery(
      "U.S. Regions and Divisions",
      "us-regions",
      ["region-neighbors.gif", "region-locate.gif", "region-identify.gif", "region-divisions.gif", "division-region.gif", "division-neighbors.gif", "division-locate.gif", "division-identify.gif", "division-states.gif", "division-borders.gif"],
      ["Region → neighbours: West", "Region → location: South", "Highlighted map → region: Northeast", "Region → divisions: Midwest", "Division → region: New England", "Division → neighbours: Mountain", "Division → location: West South Central", "Highlighted map → division: East North Central", "Division → member states: Pacific", "Division → state borders: Mid-Atlantic"],
      '2026-10-07-v7',
      '10 GIFs'
    ),
    'chinese-regions': gallery(
      'Regions of China',
      'chinese-regions',
      ['demo.gif'],
      [
        'Read East China in pinyin, reveal the answer and loaded reference, then grade the card.'
      ],
      '2026-09-23-v5',
      '1 demo'
    ),
    'chinese-dynasties': gallery(
      'Chinese Dynasties',
      'chinese-dynasties',
      ['northern-wei-map-front.png', 'northern-wei-map-answer.png'],
      [
        'Recall the territory of the Northern Wei from a blank historical-map prompt.',
        'Compare the answer with the reviewed Northern Wei map and source attribution.'
      ],
      '2026-09-30-v1',
      'front · answer'
    ),
    'taiwan-divisions': gallery(
      'Taiwan Divisions',
      'taiwan-divisions',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See a Taiwan division reveal, loaded reference, and grade.',
        'Identify a division from its locator map.',
        'Review the answer with the live Wikipedia reference loaded.',
        'Advance to the next locator-map prompt.'
      ]
    ),
    "sight-singing": gallery(
      "Sight Singing — a function-first ear & reading course",
      "sight-singing",
      ["sing.gif", "rhythm.gif", "error.gif"],
      ["Read and sing a melody, then check its scale degrees", "Read and clap a rhythm, then check the recording", "Identify the wrong note, then reveal it in red"],
      '2026-10-07-v7',
      '3 GIFs'
    ),
    "dictation": gallery(
      "Music Dictation - Write What You Hear",
      "dictation",
      ["entry.gif"],
      ["Enter a six-note transcription in the native Anki card editor and reveal comparison feedback"],
      '2026-10-07-v7',
      '1 GIFs'
    ),
    "brazil-ddd-codes": gallery(
      "Brazilian DDD Codes",
      "brazil-ddd-codes",
      ["map.gif", "reverse.gif"],
      ["Recall and reveal the geographical coverage of Brazilian DDD 11", "Identify the code from the highlighted municipal coverage, then reveal DDD 51"],
      '2026-10-07-v7',
      '2 GIFs'
    ),
    'hanzi-handwriting': gallery(
      'HSK 3.0 Hanzi Handwriting',
      'hanzi-handwriting',
      ['preview.gif'],
      [
        'Write 万 with a mouse: three wrong strokes trigger a brief hint, then correct strokes remain until the character is complete.'
      ],
      '2026-09-23-v5',
      '1 demo'
    )
  };
})();
