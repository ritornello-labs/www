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
          poster: isVideo ? base + slug + '/gallery-' + String(index + 1).padStart(2, '0') + '.png' : undefined,
          caption: captions[index]
        };
      })
    };
  }

  window.ritornelloGalleries = {
    'chat-with-your-cards': gallery(
      'Chat With Your Cards',
      'chat-with-your-cards',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png', 'gallery-03.png'],
      [
        'Follow a real card from prerequisite search to explanation and a reviewable new-note proposal.',
        'Review the proposed front and back before anything is written.',
        'Ask for a plain-language explanation beside the card.',
        'Find the prerequisite cards that bridge the current knowledge gap.'
      ],
      '2026-08-05-v3'
    ),
    'fractional-scheduler': gallery(
      'Fractional New-Card Scheduler',
      'fractional-scheduler',
      ['gallery-01.png', 'gallery-02.png'],
      [
        'Preview a one-card-every-three-days language trickle across four real subdecks.',
        'Apply fractional limits to a realistic nested collection instead of an empty configuration.'
      ],
      '2026-08-05-v3'
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
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png'],
      [
        'Mute a crowded new-card tree for today without changing tomorrow’s limits.',
        'Start with new cards spread across a messy, expanded deck tree.',
        'See every affected deck muted after the temporary triage action.'
      ],
      '2026-08-05-v3'
    ),
    'geo-trainer': gallery(
      'GeoTrainer',
      'geo-trainer',
      [
        'place.mp4',
        'river.mp4',
        'gallery-01.png',
        'gallery-02.png'
      ],
      [
        'Place Alabama, reveal the correct state, and keep the complete Anki grading bar in view.',
        'Trace the Amazon and compare the attempt with the highlighted river.',
        'A fallback still of the place-the-shape prompt for browsers that cannot play video.',
        'A fallback still of the river-tracing prompt for browsers that cannot play video.'
      ],
      '2026-08-05-v3'
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
    'chinese-regions': gallery(
      'Regions of China',
      'chinese-regions',
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png'],
      [
        'Reveal North China, load the live Wikipedia reference, and keep Anki’s grading bar visible.',
        'Recall a Chinese region from Hanzi without the repeated background artifact.',
        'Check the pinyin and fully rendered Wikipedia reference before grading.'
      ],
      '2026-08-05-v3'
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
        'Transcribe a six-event DD9 melody and compare every event with the answer.',
        'Start a later-stage six-event dictation exercise.',
        'Compare the transcription with the complete target melody and native grading controls.'
      ],
      '2026-08-05-v3'
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
