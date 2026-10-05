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
    'chat-with-your-cards': gallery(
      'Chat With Your Cards',
      'chat-with-your-cards',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png', 'gallery-04.png', 'gallery-05.png', 'gallery-06.png'],
      [
        'Type a request beside the current card and watch a reviewable new-note proposal appear.',
        'Ask for a focused companion card without leaving the reviewer.',
        'Inspect the proposed front, back, deck, and tags before anything is written.',
        'Create a filtered deck from a request in the assistant.',
        'Rebuild the collection’s filtered decks from one request.',
        'Move selected cards into another deck with a reviewable action.',
        'Find cards related to a topic in the collection.'
      ],
      '2026-09-23-v5',
      '6 workflows'
    ),
    'fractional-scheduler': gallery(
      'Fractional New-Card Scheduler',
      'fractional-scheduler',
      ['gallery-01.png', 'gallery-02.png', 'gallery-03.png', 'gallery-04.png', 'gallery-05.png', 'gallery-06.png'],
      [
        'Configure a daily trickle of new language cards and preview the schedule for four nested subdecks.',
        'Set the interval to one new card every three days for each matching language subdeck.',
        'Target the Mandarin and Spanish subdecks in a larger language collection.',
        'Balance the queue so the four subdecks contribute a small, steady number of cards each day.',
        'Set collection-wide behavior for fractional scheduling.',
        'See the nested language decks and their current new-card counts in Anki.'
      ],
      '2026-09-23-v5',
      '6 views'
    ),
    'web-embed-tools': gallery(
      'Web Embed Tools',
      'web-embed-tools',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See a URL become an embedded reference inside Anki.',
        'Open a live reference directly on the card.',
        'Use the editor controls to create an embed.',
        'Resize and review the embedded page.'
      ]
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
    'geo-trainer-us-states': gallery(
      'GeoTrainer: U.S. States',
      'geo-trainer-us-states',
      ['point.gif', 'place.gif', 'sketch.gif', 'draw.gif'],
      [
        'Identify Texas from a dot on a map without internal borders.',
        'Drag Texas into place and compare its position with the correct location.',
        'Sketch Texas in context, then compare shape, position and size.',
        'Draw Texas from memory on a blank canvas and reveal the true outline.'
      ],
      '2026-10-03-v1',
      '4 games'
    ),
    'geo-trainer-brazil-states': gallery(
      'GeoTrainer: Brazilian States',
      'geo-trainer-brazil-states',
      ['point.gif', 'place.gif', 'sketch.gif', 'draw.gif'],
      [
        'Identify Bahia from a dot on a map without internal borders.',
        'Drag Bahia into place and compare its position with the correct location.',
        'Sketch Bahia in context, then compare shape, position and size.',
        'Draw Bahia from memory on a blank canvas and reveal the true outline.'
      ],
      '2026-10-03-v2',
      '4 games'
    ),
    'geo-trainer-china-subdivisions': gallery(
      'GeoTrainer: China Provinces & Regions',
      'geo-trainer-china-subdivisions',
      ['point.gif', 'place.gif', 'sketch.gif', 'draw.gif'],
      [
        'Identify Sichuan from a dot on a map without internal borders.',
        'Drag Sichuan into place and compare its position with the correct location.',
        'Sketch Sichuan in context, then compare shape, position and size.',
        'Draw Sichuan from memory on a blank canvas and reveal the true outline.'
      ],
      '2026-10-03-v3',
      '4 games'
    ),
    'geo-trainer-reference-lines-time': gallery(
      'GeoTrainer: Reference Lines & Time',
      'geo-trainer-reference-lines-time',
      ['globe.gif', 'utc.gif', 'date-line.gif', 'atlas.gif'],
      [
        'Rotate the globe, place the Tropic of Cancer, and reveal its 23.5° N parallel.',
        'Convert 22:00 UTC−3 to 01:00 UTC on the next day.',
        'Recall eastward and westward date-line adjustments, then reveal the illustrated answer.',
        'Recall Kathmandu’s UTC+5:45 offset, then reveal Nepal Time and its map.'
      ],
      '2026-10-04-v1',
      '4 demos'
    ),
    'geo-trainer-physical-geography': gallery(
      'GeoTrainer: Physical Geography',
      'geo-trainer-physical-geography',
      ['river.gif', 'place.gif', 'sketch.gif', 'biome.gif', 'koppen.gif'],
      [
        'Zoom and pan the map, trace the Amazon, and compare your course with the river.',
        'Drag the Sahara into position and compare its placement with the answer.',
        'Sketch the Tibetan Plateau and compare its position and shape with the answer.',
        'Recall tropical moist forest vegetation, then reveal a credited photo gallery.',
        'Identify the Af tropical rainforest distribution and reveal the climate name.'
      ],
      '2026-10-04-v1',
      '5 demos'
    ),
    'geo-trainer-plate-tectonics': gallery(
      'GeoTrainer: Plate Tectonics',
      'geo-trainer-plate-tectonics',
      ['point.gif', 'place.gif', 'sketch.gif', 'trace.gif', 'concept.gif'],
      [
        'Identify the African Plate from a changing dot, then reveal its outline.',
        'Drag the Arabian Plate into position and compare with the answer.',
        'Sketch the Arabian Plate and compare its position and shape.',
        'Zoom, pan and trace the San Andreas Fault; compare the course and feedback.',
        'Recall the San Andreas Fault boundary type, then reveal transform and its locator map.'
      ],
      '2026-10-04-v1',
      '5 demos'
    ),
    'geo-trainer-islands-archipelagos': gallery(
      'GeoTrainer: Islands & Archipelagos',
      'geo-trainer-islands-archipelagos',
      ['globe.gif', 'concept.gif'],
      [
        'Rotate the globe, draw an ellipse around Japan, move and resize it, then reveal coverage and center-offset feedback.',
        'Recall the Japanese archipelago’s surrounding waters, then reveal the complete locator map.'
      ],
      '2026-10-04-v1',
      '2 demos'
    ),
    'geo-trainer-world-countries': gallery(
      'GeoTrainer: World Countries',
      'geo-trainer-world-countries',
      ['point.gif', 'place.gif', 'sketch.gif', 'draw.gif', 'membership.gif', 'concept.gif'],
      [
        'Identify Italy from a dot on a map without internal borders; reveal its name and outline.',
        'Drag Italy into place, then compare its location with native distance feedback.',
        'Sketch France in context, then compare shape and position.',
        'Draw Italy from memory on a square canvas; compare its outline, including missed islands.',
        'Zoom and pan Europe, select all 27 EU members, and reveal the membership feedback.',
        'Recall the Southern Cone grouping basis, then reveal its complete locator map.'
      ],
      '2026-10-04-v1',
      '6 demos'
    ),
    'geo-trainer-india-subdivisions': gallery(
      'GeoTrainer: Indian States & Union Territories',
      'geo-trainer-india-subdivisions',
      ['point.gif', 'place.gif', 'sketch.gif', 'draw.gif'],
      [
        'Identify Maharashtra from a dot on a borderless map; reveal its name and outline.',
        'Drag Maharashtra into place, then compare its location with native distance feedback.',
        'Sketch Maharashtra in context and compare its shape and position.',
        'Draw Maharashtra from memory on a square canvas and compare its outline.'
      ],
      '2026-10-04-v1',
      '4 demos'
    ),
    'geo-trainer': gallery(
      'GeoTrainer',
      'geo-trainer',
      [
        {file: 'place.mp4', poster: 'place-front.png'},
        'place-back.png',
        {file: 'sketch.mp4', poster: 'sketch-front.png'},
        'sketch-back.png',
        {file: 'draw.mp4', poster: 'draw-front.png'},
        'draw-back.png',
        {file: 'river.mp4', poster: 'river-front.png'},
        'river-back.png',
        {file: 'globe.mp4', poster: 'globe-front.png'},
        'globe-back.png',
        {file: 'point.mp4', poster: 'point-front.png'},
        'point-back.png'
      ],
      [
        'Drag the Libyan Desert silhouette onto a blank map and reveal the placement score.',
        'The Libyan Desert placement after GeoTrainer grades the distance.',
        'Sketch Italy in its map position, then compare shape and placement with the answer.',
        'GeoTrainer compares the freehand Italy sketch with the true outline.',
        'Draw Italy’s outline from memory on a blank canvas and reveal the overlay.',
        'The freehand and true Italy outlines overlaid for shape grading.',
        'Trace the Amazon’s course and reveal the distance-based result.',
        'The completed Amazon river trace and grading result.',
        'Draw an ellipse around Iceland on the globe and reveal the placement score.',
        'The Iceland ellipse earns Good for coverage and footprint.',
        'Identify the country marked by a dot, then reveal the answer.',
        'The dot’s country, Albania, highlighted after the reveal.'
      ],
      '2026-09-23-v5',
      '6 games'
    ),
    'us-regions': gallery(
      'U.S. Regions and Divisions',
      'us-regions',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png'],
      [
        'See region and division recall in Anki.',
        'Recall the states and boundaries in a Census region.',
        'Reveal the region with locator-map context.'
      ]
    ),
    'us-states': templateGallery('U.S. States', 'us-states', [
      {slug: 'map-to-state', video: 'Identify Hawaii from its highlighted map, then reveal the state name.', still: 'Hawaii revealed on the map-recognition card.'},
      {slug: 'state-to-capital', video: 'Recall California’s capital before revealing Sacramento.', still: 'Sacramento revealed as the capital of California.'},
      {slug: 'capital-to-state', video: 'Recall the state that has Juneau as its capital, then reveal Alaska.', still: 'Alaska revealed from the Juneau prompt.'},
      {slug: 'state-on-map', video: 'Find Louisiana on a blank U.S. map, then reveal its location.', still: 'Louisiana highlighted after the map-placement prompt.'},
      {slug: 'state-to-abbreviation', video: 'Recall the postal abbreviation for Massachusetts, then reveal MA.', still: 'The Massachusetts postal-code answer card.'},
      {slug: 'abbreviation-to-state', video: 'Expand NM into New Mexico, then reveal the postal-code answer.', still: 'New Mexico revealed from its NM abbreviation.'},
      {slug: 'state-to-region', video: 'Place Colorado in its Census region, then reveal the West.', still: 'Colorado’s Census region and locator-map answer.'},
      {slug: 'state-to-division', video: 'Place Kentucky in its Census division, then reveal East South Central.', still: 'Kentucky’s Census division and locator-map answer.'},
      {slug: 'connections', video: 'Recall the states and waterways bordering Tennessee, then reveal its connections.', still: 'Tennessee’s neighboring-state connections card.'}
    ], '2026-09-23-v6'),
    'brazilian-states': templateGallery('Brazilian States', 'brazilian-states', [
      {slug: 'map-to-state', video: 'Identify Amazonas from its highlighted map, then reveal the state name.', still: 'Amazonas revealed from a highlighted-state map.'},
      {slug: 'state-to-capital', video: 'Recall Bahia’s capital, then reveal Salvador.', still: 'Salvador revealed as the capital of Bahia.'},
      {slug: 'capital-to-state', video: 'Recall the state whose capital is Florianópolis, then reveal Santa Catarina.', still: 'Santa Catarina revealed from its capital.'},
      {slug: 'state-on-map', video: 'Locate Rio Grande do Sul on a blank Brazil map, then reveal it.', still: 'Rio Grande do Sul highlighted on the Brazil map.'},
      {slug: 'neighbors', video: 'Recall the states bordering Bahia, then reveal its connections.', still: 'Bahia’s neighboring-state answer card.'},
      {slug: 'abbreviation-to-state', video: 'Expand PE into Pernambuco, then reveal the state.', still: 'Pernambuco revealed from its PE abbreviation.'},
      {slug: 'state-to-abbreviation', video: 'Recall Mato Grosso do Sul’s abbreviation, then reveal MS.', still: 'MS revealed as Mato Grosso do Sul’s abbreviation.'},
      {slug: 'population', video: 'Estimate São Paulo’s population, then reveal the 2022 figure.', still: 'São Paulo’s 2022 population answer card.'}
    ], '2026-09-23-v6'),
    'chinese-regions': gallery(
      'Regions of China',
      'chinese-regions',
      [{file: 'demo.mp4', poster: 'gallery-01.png'}, 'gallery-01.png', 'gallery-02.png'],
      [
        'Read East China in pinyin, reveal the answer and loaded reference, then grade the card.',
        'Recall the pinyin for 华东 on a clean, full-window card front.',
        'Check Huádōng against the loaded East China reference before grading.'
      ],
      '2026-09-23-v5',
      '3 samples'
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
    'sight-singing': gallery(
      'Sight Singing',
      'sight-singing',
      ['gallery-01.png', 'gallery-02.png'],
      [
        'Sing the displayed melody.',
        'Reveal the scale degrees and play the melody.'
      ],
      '2026-08-05-v3'
    ),
    'dictation': gallery(
      'Dictation',
      'dictation',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png'],
      [
        'Enter a six-event DD9 transcription note by note, then compare it with the target melody.',
        'Start a later-stage six-event dictation exercise with the native grading controls in view.',
        'Compare the entered melody with the complete six-event target.'
      ],
      '2026-08-06-v4'
    ),
    'brazil-ddd-codes': gallery(
      'Brazilian DDD Codes',
      'brazil-ddd-codes',
      ['gallery-01.png', 'gallery-02.png', 'gallery-03.png', 'gallery-04.png'],
      [
        'Recall the coverage of DDD 68 from a blank municipal map.',
        'Reveal the DDD 68 coverage area in Acre.',
        'Recall the DDD code from the highlighted coverage area.',
        'Reveal DDD 68 on the reverse card template.'
      ],
      '2026-08-06-v4'
    ),
    'hanzi-handwriting': gallery(
      'HSK 3.0 Hanzi Handwriting',
      'hanzi-handwriting',
      [{file: 'demo.mp4', poster: 'gallery-01.png'}, 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'Write 万 with a mouse: three wrong strokes trigger a brief hint, then correct strokes remain until the character is complete.',
        'Begin writing 万 from memory on the blank practice grid.',
        'After three wrong attempts, a purple first-stroke hint appears briefly without revealing the whole character.',
        'All three accepted strokes of 万 stay visible when the writing exercise is complete.'
      ],
      '2026-09-23-v5',
      '4 samples'
    )
  };
})();
