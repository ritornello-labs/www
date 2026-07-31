(function () {
  function gallery(title, slug, files, captions, release) {
    var base = 'media/ankiweb/' + (release || '2026-07-31-v2') + '/';
    return {
      title: title,
      items: files.map(function (file, index) {
        var isVideo = file.endsWith('.mp4');
        return {
          type: isVideo ? 'video' : 'image',
          src: base + slug + '/' + file,
          poster: isVideo ? base + slug + '/gallery-01.png' : undefined,
          caption: captions[index]
        };
      })
    };
  }

  window.ritornelloGalleries = {
    'dynamic-cards': gallery(
      'Dynamic Cards',
      'dynamic-cards',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See a generated card keep its values stable through reveal.',
        'Answer a randomized arithmetic prompt.',
        'Reveal the answer generated from the same seed.',
        'Review another stable randomized card state.'
      ]
    ),
    'chat-with-your-cards': gallery(
      'Chat With Your Cards',
      'chat-with-your-cards',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'Open the chat dock beside the complete Anki window.',
        'Keep the collection visible while the dock is expanded.',
        'Use the composer, attachments, pins, and proposal controls.',
        'Invoke the selected Claude Code backend from the dock.'
      ]
    ),
    'fractional-scheduler': gallery(
      'Fractional New-Card Scheduler',
      'fractional-scheduler',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See fractional scheduling configured inside Anki.',
        'Configure per-deck fractional new-card limits.',
        'Inspect the scheduler state for a deck.',
        'Apply the selected scheduling plan.'
      ]
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
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See the one-keystroke triage flow in Anki.',
        'Open the triage actions from Anki.',
        'Choose a temporary workload reduction.',
        'Return to a manageable review day.'
      ]
    ),
    'geo-trainer': gallery(
      'GeoTrainer',
      'geo-trainer',
      [
        'demo.mp4',
        'gallery-01.png',
        'gallery-02.png',
        'gallery-03.png',
        'gallery-04.png',
        'gallery-05.png',
        'gallery-06.png',
        'gallery-07.png',
        'gallery-08.png',
        'gallery-09.png',
        'gallery-10.png'
      ],
      [
        'Place a geographic silhouette in the complete Anki reviewer.',
        'Start a place-the-shape challenge with native review controls visible.',
        'Compare the placement and choose an Anki grade.',
        'Identify a country on a borderless map.',
        'Recognize a desert by its location and shape.',
        'Draw a geographic region from memory.',
        'Trace the course of a river.',
        'Recognize a mountain range.',
        'Review a which-country answer.',
        'Review a place-the-shape answer.',
        'Review a tracing answer.'
      ],
      '2026-07-31-v2'
    ),
    'us-regions': gallery(
      'U.S. Regions and Divisions',
      'us-regions',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See region and division recall in Anki.',
        'Recall the states and boundaries in a Census region.',
        'Reveal the region with locator-map context.',
        'Study the reverse direction from map to name.'
      ]
    ),
    'chinese-regions': gallery(
      'Regions of China',
      'chinese-regions',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png', 'gallery-04.png'],
      [
        'Reveal a region, wait for its live Wikipedia reference, then grade it in Anki.',
        'Recall a Chinese region from Hanzi in the complete reviewer.',
        'Check the pinyin and loaded Wikipedia reference before grading.',
        'Place a region from its member set and blank map.',
        'Study the map-to-name direction with the answer beside it.'
      ],
      '2026-07-31-v2'
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
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See a sight-singing exercise from prompt to playback.',
        'Sing the displayed melody.',
        'Use scale-degree cues to check the phrase.',
        'Reveal the answer and play the melody.'
      ]
    ),
    'dictation': gallery(
      'Dictation',
      'dictation',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See a dictation exercise from playback to review.',
        'Listen and transcribe the melody.',
        'Enter notes and rhythm on the staff.',
        'Compare the transcription with the answer.'
      ]
    ),
    'hanzi-handwriting': gallery(
      'HSK 3.0 Hanzi Handwriting',
      'hanzi-handwriting',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'See stroke-by-stroke handwriting practice.',
        'Write the prompted Hanzi from memory.',
        'Step through the character stroke by stroke.',
        'Compare the completed character with the answer.'
      ]
    )
  };
})();
