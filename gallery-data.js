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
      ['demo.mp4', 'gallery-01.png', 'gallery-02.png'],
      [
        'Type a request beside the current card and watch a reviewable new-note proposal appear.',
        'Ask for a focused companion card without leaving the reviewer.',
        'Inspect the proposed front, back, deck, and tags before anything is written.'
      ],
      '2026-08-06-v4'
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
      '2026-08-06-v4'
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
        'Drag the Libyan Desert silhouette into place, reveal the answer, and keep the complete Anki grading bar in view.',
        'Draw the Amazon course on the map and reveal GeoTrainer’s distance-based result.',
        'The Libyan Desert place-the-shape prompt before the drag begins.',
        'The completed Amazon trace with GeoTrainer’s grading result.'
      ],
      '2026-08-06-v4'
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
