(function () {
  var isoSlider      = document.getElementById('iso');
  var apertureSlider = document.getElementById('aperture');
  var shutterSlider  = document.getElementById('shutter');

  var isoValue       = document.getElementById('iso-value');
  var apertureValue  = document.getElementById('aperture-value');
  var shutterValue   = document.getElementById('shutter-value');

  var previewImg     = document.getElementById('sim-preview');
  var noiseOverlay   = document.getElementById('sim-noise');
  var dofLabel       = document.getElementById('sim-dof');
  var evReadout      = document.getElementById('readout-ev');
  var statusReadout  = document.getElementById('readout-status');

  var ISO_STOPS   = [100, 200, 400, 800, 1600, 3200, 6400];
  var F_STOPS     = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
  var SHUTTER_STOPS = [
    { value: 1/4000, label: '1/4000' },
    { value: 1/2000, label: '1/2000' },
    { value: 1/1000, label: '1/1000' },
    { value: 1/500,  label: '1/500' },
    { value: 1/250,  label: '1/250' },
    { value: 1/125,  label: '1/125' },
    { value: 1/60,   label: '1/60' },
    { value: 1/30,   label: '1/30' },
    { value: 1/15,   label: '1/15' },
    { value: 1/8,    label: '1/8' },
    { value: 1/4,    label: '1/4' },
    { value: 0.5,    label: '1/2' },
    { value: 1,      label: '1s' },
  ];

  var BASE_ISO = 100;
  var BASE_F   = 5.6;
  var BASE_SHUTTER = 1/125;

  function log2(x) { return Math.log(x) / Math.LN2; }

  function evOffset(iso, f, shutter) {
    return log2(iso / BASE_ISO) +
           log2((BASE_F * BASE_F) / (f * f)) +
           log2(shutter / BASE_SHUTTER);
  }

  function dofDescription(f) {
    if (f <= 2)   return 'Very shallow DOF';
    if (f <= 4)   return 'Shallow DOF';
    if (f <= 8)   return 'Moderate DOF';
    if (f <= 16)  return 'Deep DOF';
    return 'Very deep DOF';
  }

  function highlightCard(setting) {
    document.querySelectorAll('.explainer-card').forEach(function (card) {
      card.classList.toggle('explainer-card--active', card.dataset.setting === setting);
    });
  }

  function update(activeSlider) {
    var isoIdx     = parseInt(isoSlider.value, 10);
    var apIdx      = parseInt(apertureSlider.value, 10);
    var shutterIdx = parseInt(shutterSlider.value, 10);

    var iso     = ISO_STOPS[isoIdx];
    var f       = F_STOPS[apIdx];
    var shutter = SHUTTER_STOPS[shutterIdx].value;

    isoValue.textContent      = iso;
    apertureValue.textContent = 'f/' + f;
    shutterValue.textContent  = SHUTTER_STOPS[shutterIdx].label;

    var ev = evOffset(iso, f, shutter);

    var brightness = Math.pow(2, ev * 0.5);
    brightness = Math.min(Math.max(brightness, 0.05), 4);

    var noiseOpacity = Math.max(0, (isoIdx / (ISO_STOPS.length - 1)) * 0.6);

    var blurPx = 0;
    if (shutterIdx >= 6) {
      blurPx = (shutterIdx - 5) * 0.7;
    }

    previewImg.style.filter = 'brightness(' + brightness.toFixed(2) + ') blur(' + blurPx.toFixed(1) + 'px)';
    noiseOverlay.style.opacity = noiseOpacity.toFixed(2);
    dofLabel.textContent = dofDescription(f);

    var evRounded = Math.round(ev * 10) / 10;
    var sign = evRounded > 0 ? '+' : '';
    evReadout.textContent = 'Exposure: ' + sign + evRounded.toFixed(1) + ' EV';

    statusReadout.className = 'readout__status';
    if (ev < -1.5) {
      statusReadout.textContent = 'Underexposed — too dark';
      statusReadout.classList.add('readout__status--under');
    } else if (ev > 1.5) {
      statusReadout.textContent = 'Overexposed — too bright';
      statusReadout.classList.add('readout__status--over');
    } else {
      statusReadout.textContent = 'Well exposed — nice balance!';
      statusReadout.classList.add('readout__status--good');
    }

  }

  function clearPresetActive() {
    document.querySelectorAll('.preset').forEach(function (btn) {
      btn.classList.remove('preset--active');
    });
  }

  isoSlider.addEventListener('input', function () { clearPresetActive(); update(); });
  apertureSlider.addEventListener('input', function () { clearPresetActive(); update(); });
  shutterSlider.addEventListener('input', function () { clearPresetActive(); update(); });

  // Preset buttons → set sliders and update
  document.querySelectorAll('.preset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      isoSlider.value      = btn.dataset.iso;
      apertureSlider.value = btn.dataset.aperture;
      shutterSlider.value  = btn.dataset.shutter;
      clearPresetActive();
      btn.classList.add('preset--active');
      update();
    });
  });

  // Gallery click → swap simulator image
  var galleryItems = document.querySelectorAll('.gallery__item');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      galleryItems.forEach(function (i) { i.classList.remove('gallery__item--active'); });
      item.classList.add('gallery__item--active');
      previewImg.src = item.dataset.src;
    });
  });

  // Init
  isoSlider.value      = '0';
  apertureSlider.value = '4';
  shutterSlider.value  = '5';
  update();
})();
