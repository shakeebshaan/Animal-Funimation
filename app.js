// Animal Funimation App

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const requestedAnimal = urlParams.get('animal');
const action = urlParams.get('action');
const isFileOpen = urlParams.get('file') === 'open';
const noteAction = urlParams.get('note');

// List of animals - each has name, frames (array of paths), and sound (path or null)
// Generated from actual directory structure and file existence.
const animals = [
    { name: 'alpaca', frames: ["alpaca/alpaca_frame01.png", "alpaca/alpaca_frame02.png", "alpaca/alpaca_frame03.png"], backgrounds: ["alpaca/background_png-alpaca_frame01.png", "alpaca/background_png-alpaca_frame02.png", "alpaca/background_png-alpaca_frame03.png"], sound: "alpaca/alpaca_sound.wav" }
,
    { name: 'arctic_fox', frames: ["arctic_fox/arctic_fox_frame01.png", "arctic_fox/arctic_fox_frame02.png", "arctic_fox/arctic_fox_frame03.png"], backgrounds: ["arctic_fox/background_png-arctic_fox_frame01.png", "arctic_fox/background_png-arctic_fox_frame02.png", "arctic_fox/background_png-arctic_fox_frame03.png"], sound: "arctic_fox/arctic_fox_sound.wav" }
,
    { name: 'beaver', frames: ["beaver/beaver_frame01.png", "beaver/beaver_frame02.png", "beaver/beaver_frame03.png"], backgrounds: ["beaver/background_png-beaver_frame01.png", "beaver/background_png-beaver_frame02.png", "beaver/background_png-beaver_frame03.png"], sound: "beaver/beaver_sound.wav" }
,
    { name: 'beluga_whale', frames: ["beluga_whale/beluga_whale_frame01.png", "beluga_whale/beluga_whale_frame02.png", "beluga_whale/beluga_whale_frame03.png"], backgrounds: ["beluga_whale/background_png-beluga_whale_frame01.png", "beluga_whale/background_png-beluga_whale_frame02.png", "beluga_whale/background_png-beluga_whale_frame03.png"], sound: "beluga_whale/beluga_whale_sound.wav" }
,
    { name: 'binturong', frames: ["binturong/binturong_frame01.png", "binturong/binturong_frame02.png", "binturong/binturong_frame03.png"], backgrounds: ["binturong/background_png-binturong_frame01.png", "binturong/background_png-binturong_frame02.png", "binturong/background_png-binturong_frame03.png"], sound: "binturong/binturong_sound.wav" }
,
    { name: 'bluebird', frames: ["bluebird/bluebird_frame01.png", "bluebird/bluebird_frame02.png", "bluebird/bluebird_frame03.png"], backgrounds: ["bluebird/background_png-bluebird_frame01.png", "bluebird/background_png-bluebird_frame02.png", "bluebird/background_png-bluebird_frame03.png"], sound: "bluebird/bluebird_sound.wav" }
,
    { name: 'bumblebee', frames: ["bumblebee/bumblebee_frame01.png", "bumblebee/bumblebee_frame02.png", "bumblebee/bumblebee_frame03.png"], backgrounds: ["bumblebee/background_png-bumblebee_frame01.png", "bumblebee/background_png-bumblebee_frame02.png", "bumblebee/background_png-bumblebee_frame03.png"], sound: "bumblebee/bumblebee_sound.wav" }
,
    { name: 'calf', frames: ["calf/calf_frame01.png", "calf/calf_frame02.png", "calf/calf_frame03.png"], backgrounds: ["calf/background_png-calf_frame01.png", "calf/background_png-calf_frame02.png", "calf/background_png-calf_frame03.png"], sound: "calf/calf_sound.wav" }
,
    { name: 'canary', frames: ["canary/canary_frame01.png", "canary/canary_frame02.png", "canary/canary_frame03.png"], backgrounds: ["canary/background_png-canary_frame01.png", "canary/background_png-canary_frame02.png", "canary/background_png-canary_frame03.png"], sound: "canary/canary_sound.wav" }
,
    { name: 'capybara', frames: ["capybara/capybara_frame01.png", "capybara/capybara_frame02.png", "capybara/capybara_frame03.png"], backgrounds: ["capybara/background_png-capybara_frame01.png", "capybara/background_png-capybara_frame02.png", "capybara/background_png-capybara_frame03.png"], sound: "capybara/capybara_sound.wav" }
,
    { name: 'catbird', frames: ["catbird/catbird_frame01.png", "catbird/catbird_frame02.png", "catbird/catbird_frame03.png"], backgrounds: ["catbird/background_png-catbird_frame01.png", "catbird/background_png-catbird_frame02.png", "catbird/background_png-catbird_frame03.png"], sound: "catbird/catbird_sound.wav" }
,
    { name: 'chick', frames: ["chick/chick_frame01.png", "chick/chick_frame02.png", "chick/chick_frame03.png"], backgrounds: ["chick/background_png-chick_frame01.png", "chick/background_png-chick_frame02.png", "chick/background_png-chick_frame03.png"], sound: "chick/chick_sound.wav" }
,
    { name: 'chickadee', frames: ["chickadee/chickadee_frame01.png", "chickadee/chickadee_frame02.png", "chickadee/chickadee_frame03.png"], backgrounds: ["chickadee/background_png-chickadee_frame01.png", "chickadee/background_png-chickadee_frame02.png", "chickadee/background_png-chickadee_frame03.png"], sound: "chickadee/chickadee_sound.wav" }
,
    { name: 'chinchilla', frames: ["chinchilla/chinchilla_frame01.png", "chinchilla/chinchilla_frame02.png", "chinchilla/chinchilla_frame03.png"], backgrounds: ["chinchilla/background_png-chinchilla_frame01.png", "chinchilla/background_png-chinchilla_frame02.png", "chinchilla/background_png-chinchilla_frame03.png"], sound: "chinchilla/chinchilla_sound.wav" }
,
    { name: 'chipmunk', frames: ["chipmunk/chipmunk_frame01.png", "chipmunk/chipmunk_frame02.png", "chipmunk/chipmunk_frame03.png"], backgrounds: ["chipmunk/background_png-chipmunk_frame01.png", "chipmunk/background_png-chipmunk_frame02.png", "chipmunk/background_png-chipmunk_frame03.png"], sound: "chipmunk/chipmunk_sound.wav" }
,
    { name: 'clock', frames: ["clock/clock_frame01.png", "clock/clock_frame02.png", "clock/clock_frame03.png"], backgrounds: ["clock/background_png-clock_frame01.png", "clock/background_png-clock_frame02.png", "clock/background_png-clock_frame03.png"], sound: "clock/clock_sound.wav" }
,
    { name: 'cockatiel', frames: ["cockatiel/cockatiel_frame01.png", "cockatiel/cockatiel_frame02.png", "cockatiel/cockatiel_frame03.png"], backgrounds: ["cockatiel/background_png-cockatiel_frame01.png", "cockatiel/background_png-cockatiel_frame02.png", "cockatiel/background_png-cockatiel_frame03.png"], sound: "cockatiel/cockatiel_sound.wav" }
,
    { name: 'cricket', frames: ["cricket/cricket_frame01.png", "cricket/cricket_frame02.png", "cricket/cricket_frame03.png"], backgrounds: ["cricket/background_png-cricket_frame01.png", "cricket/background_png-cricket_frame02.png", "cricket/background_png-cricket_frame03.png"], sound: "cricket/cricket_sound.wav" }
,
    { name: 'dik-dik', frames: ["dik-dik/dik-dik_frame01.png", "dik-dik/dik-dik_frame02.png", "dik-dik/dik-dik_frame03.png"], backgrounds: ["dik-dik/background_png-dik-dik_frame01.png", "dik-dik/background_png-dik-dik_frame02.png", "dik-dik/background_png-dik-dik_frame03.png"], sound: "dik-dik/dik-dik_sound.wav" }
,
    { name: 'dolphin', frames: ["dolphin/dolphin_frame01.png", "dolphin/dolphin_frame02.png", "dolphin/dolphin_frame03.png"], backgrounds: ["dolphin/background_png-dolphin_frame01.png", "dolphin/background_png-dolphin_frame02.png", "dolphin/background_png-dolphin_frame03.png"], sound: "dolphin/dolphin_sound.wav" }
,
    { name: 'donkey', frames: ["donkey/donkey_frame01.png", "donkey/donkey_frame02.png", "donkey/donkey_frame03.png"], backgrounds: ["donkey/background_png-donkey_frame01.png", "donkey/background_png-donkey_frame02.png", "donkey/background_png-donkey_frame03.png"], sound: "donkey/donkey_sound.wav" }
,
    { name: 'dove', frames: ["dove/dove_frame01.png", "dove/dove_frame02.png", "dove/dove_frame03.png"], backgrounds: ["dove/background_png-dove_frame01.png", "dove/background_png-dove_frame02.png", "dove/background_png-dove_frame03.png"], sound: "dove/dove_sound.wav" }
,
    { name: 'drum', frames: ["drum/drum_frame01.png", "drum/drum_frame02.png", "drum/drum_frame03.png"], backgrounds: ["drum/background_png-drum_frame01.png", "drum/background_png-drum_frame02.png", "drum/background_png-drum_frame03.png"], sound: "drum/drum_sound.wav" }
,
    { name: 'duckling', frames: ["duckling/duckling_frame01.png", "duckling/duckling_frame02.png", "duckling/duckling_frame03.png"], backgrounds: ["duckling/background_png-duckling_frame01.png", "duckling/background_png-duckling_frame02.png", "duckling/background_png-duckling_frame03.png"], sound: "duckling/duckling_sound.wav" }
,
    { name: 'fawn', frames: ["fawn/fawn_frame01.png", "fawn/fawn_frame02.png", "fawn/fawn_frame03.png"], backgrounds: ["fawn/background_png-fawn_frame01.png", "fawn/background_png-fawn_frame02.png", "fawn/background_png-fawn_frame03.png"], sound: "fawn/fawn_sound.wav" }
,
    { name: 'fennec_fox', frames: ["fennec_fox/fennec_fox_frame01.png", "fennec_fox/fennec_fox_frame02.png", "fennec_fox/fennec_fox_frame03.png"], backgrounds: ["fennec_fox/background_png-fennec_fox_frame01.png", "fennec_fox/background_png-fennec_fox_frame02.png", "fennec_fox/background_png-fennec_fox_frame03.png"], sound: "fennec_fox/fennec_fox_sound.wav" }
,
    { name: 'ferret', frames: ["ferret/ferret_frame01.png", "ferret/ferret_frame02.png", "ferret/ferret_frame03.png"], backgrounds: ["ferret/background_png-ferret_frame01.png", "ferret/background_png-ferret_frame02.png", "ferret/background_png-ferret_frame03.png"], sound: "ferret/ferret_sound.wav" }
,
    { name: 'foal', frames: ["foal/foal_frame01.png", "foal/foal_frame02.png", "foal/foal_frame03.png"], backgrounds: ["foal/background_png-foal_frame01.png", "foal/background_png-foal_frame02.png", "foal/background_png-foal_frame03.png"], sound: "foal/foal_sound.wav" }
,
    { name: 'frog', frames: ["frog/frog_frame01.png", "frog/frog_frame02.png", "frog/frog_frame03.png"], backgrounds: ["frog/background_png-frog_frame01.png", "frog/background_png-frog_frame02.png", "frog/background_png-frog_frame03.png"], sound: "frog/frog_sound.wav" }
,
    { name: 'gecko', frames: ["gecko/gecko_frame01.png", "gecko/gecko_frame02.png", "gecko/gecko_frame03.png"], backgrounds: ["gecko/background_png-gecko_frame01.png", "gecko/background_png-gecko_frame02.png", "gecko/background_png-gecko_frame03.png"], sound: "gecko/gecko_sound.wav" }
,
    { name: 'genet', frames: ["genet/genet_frame01.png", "genet/genet_frame02.png", "genet/genet_frame03.png"], backgrounds: ["genet/background_png-genet_frame01.png", "genet/background_png-genet_frame02.png", "genet/background_png-genet_frame03.png"], sound: "genet/genet_sound.wav" }
,
    { name: 'gerbil', frames: ["gerbil/gerbil_frame01.png", "gerbil/gerbil_frame02.png", "gerbil/gerbil_frame03.png"], backgrounds: ["gerbil/background_png-gerbil_frame01.png", "gerbil/background_png-gerbil_frame02.png", "gerbil/background_png-gerbil_frame03.png"], sound: "gerbil/gerbil_sound.wav" }
,
    { name: 'goat', frames: ["goat/goat_frame01.png", "goat/goat_frame02.png", "goat/goat_frame03.png"], backgrounds: ["goat/background_png-goat_frame01.png", "goat/background_png-goat_frame02.png", "goat/background_png-goat_frame03.png"], sound: "goat/goat_sound.wav" }
,
    { name: 'goldfinch', frames: ["goldfinch/goldfinch_frame01.png", "goldfinch/goldfinch_frame02.png", "goldfinch/goldfinch_frame03.png"], backgrounds: ["goldfinch/background_png-goldfinch_frame01.png", "goldfinch/background_png-goldfinch_frame02.png", "goldfinch/background_png-goldfinch_frame03.png"], sound: "goldfinch/goldfinch_sound.wav" }
,
    { name: 'goose', frames: ["goose/goose_frame01.png", "goose/goose_frame02.png", "goose/goose_frame03.png"], backgrounds: ["goose/background_png-goose_frame01.png", "goose/background_png-goose_frame02.png", "goose/background_png-goose_frame03.png"], sound: "goose/goose_sound.wav" }
,
    { name: 'guinea_pig', frames: ["guinea_pig/guinea_pig_frame01.png", "guinea_pig/guinea_pig_frame02.png", "guinea_pig/guinea_pig_frame03.png"], backgrounds: ["guinea_pig/background_png-guinea_pig_frame01.png", "guinea_pig/background_png-guinea_pig_frame02.png", "guinea_pig/background_png-guinea_pig_frame03.png"], sound: "guinea_pig/guinea_pig_sound.wav" }
,
    { name: 'hamster', frames: ["hamster/hamster_frame01.png", "hamster/hamster_frame02.png", "hamster/hamster_frame03.png"], backgrounds: ["hamster/background_png-hamster_frame01.png", "hamster/background_png-hamster_frame02.png", "hamster/background_png-hamster_frame03.png"], sound: "hamster/hamster_sound.wav" }
,
    { name: 'harvest_mouse', frames: ["harvest_mouse/harvest_mouse_frame01.png", "harvest_mouse/harvest_mouse_frame02.png", "harvest_mouse/harvest_mouse_frame03.png"], backgrounds: ["harvest_mouse/background_png-harvest_mouse_frame01.png", "harvest_mouse/background_png-harvest_mouse_frame02.png", "harvest_mouse/background_png-harvest_mouse_frame03.png"], sound: "harvest_mouse/harvest_mouse_sound.wav" }
,
    { name: 'heartbeat', frames: ["heartbeat/heartbeat_frame01.png", "heartbeat/heartbeat_frame02.png", "heartbeat/heartbeat_frame03.png"], backgrounds: ["heartbeat/background_png-heartbeat_frame01.png", "heartbeat/background_png-heartbeat_frame02.png", "heartbeat/background_png-heartbeat_frame03.png"], sound: "heartbeat/heartbeat_sound.wav" }
,
    { name: 'hedgehog', frames: ["hedgehog/hedgehog_frame01.png", "hedgehog/hedgehog_frame02.png", "hedgehog/hedgehog_frame03.png"], backgrounds: ["hedgehog/background_png-hedgehog_frame01.png", "hedgehog/background_png-hedgehog_frame02.png", "hedgehog/background_png-hedgehog_frame03.png"], sound: "hedgehog/hedgehog_sound.wav" }
,
    { name: 'hummingbird', frames: ["hummingbird/hummingbird_frame01.png", "hummingbird/hummingbird_frame02.png", "hummingbird/hummingbird_frame03.png"], backgrounds: ["hummingbird/background_png-hummingbird_frame01.png", "hummingbird/background_png-hummingbird_frame02.png", "hummingbird/background_png-hummingbird_frame03.png"], sound: "hummingbird/hummingbird_sound.wav" }
,
    { name: 'kingfisher', frames: ["kingfisher/kingfisher_frame01.png", "kingfisher/kingfisher_frame02.png", "kingfisher/kingfisher_frame03.png"], backgrounds: ["kingfisher/background_png-kingfisher_frame01.png", "kingfisher/background_png-kingfisher_frame02.png", "kingfisher/background_png-kingfisher_frame03.png"], sound: "kingfisher/kingfisher_sound.wav" }
,
    { name: 'kitten', frames: ["kitten/kitten_frame01.png", "kitten/kitten_frame02.png", "kitten/kitten_frame03.png"], backgrounds: ["kitten/background_png-kitten_frame01.png", "kitten/background_png-kitten_frame02.png", "kitten/background_png-kitten_frame03.png"], sound: "kitten/kitten_sound.wav" }
,
    { name: 'koala', frames: ["koala/koala_frame01.png", "koala/koala_frame02.png", "koala/koala_frame03.png"], backgrounds: ["koala/background_png-koala_frame01.png", "koala/background_png-koala_frame02.png", "koala/background_png-koala_frame03.png"], sound: "koala/koala_sound.wav" }
,
    { name: 'kookaburra', frames: ["kookaburra/kookaburra_frame01.png", "kookaburra/kookaburra_frame02.png", "kookaburra/kookaburra_frame03.png"], backgrounds: ["kookaburra/background_png-kookaburra_frame01.png", "kookaburra/background_png-kookaburra_frame02.png", "kookaburra/background_png-kookaburra_frame03.png"], sound: "kookaburra/kookaburra_sound.wav" }
,
    { name: 'lamb', frames: ["lamb/lamb_frame01.png", "lamb/lamb_frame02.png", "lamb/lamb_frame03.png"], backgrounds: ["lamb/background_png-lamb_frame01.png", "lamb/background_png-lamb_frame02.png", "lamb/background_png-lamb_frame03.png"], sound: "lamb/lamb_sound.wav" }
,
    { name: 'llama', frames: ["llama/llama_frame01.png", "llama/llama_frame02.png", "llama/llama_frame03.png"], backgrounds: ["llama/background_png-llama_frame01.png", "llama/background_png-llama_frame02.png", "llama/background_png-llama_frame03.png"], sound: "llama/llama_sound.wav" }
,
    { name: 'lorikeet', frames: ["lorikeet/lorikeet_frame01.png", "lorikeet/lorikeet_frame02.png", "lorikeet/lorikeet_frame03.png"], backgrounds: ["lorikeet/background_png-lorikeet_frame01.png", "lorikeet/background_png-lorikeet_frame02.png", "lorikeet/background_png-lorikeet_frame03.png"], sound: "lorikeet/lorikeet_sound.wav" }
,
    { name: 'lovebird', frames: ["lovebird/lovebird_frame01.png", "lovebird/lovebird_frame02.png", "lovebird/lovebird_frame03.png"], backgrounds: ["lovebird/background_png-lovebird_frame01.png", "lovebird/background_png-lovebird_frame02.png", "lovebird/background_png-lovebird_frame03.png"], sound: "lovebird/lovebird_sound.wav" }
,
    { name: 'manatee', frames: ["manatee/manatee_frame01.png", "manatee/manatee_frame02.png", "manatee/manatee_frame03.png"], backgrounds: ["manatee/background_png-manatee_frame01.png", "manatee/background_png-manatee_frame02.png", "manatee/background_png-manatee_frame03.png"], sound: "manatee/manatee_sound.wav" }
,
    { name: 'manx_shearwater', frames: ["manx_shearwater/manx_shearwater_frame01.png", "manx_shearwater/manx_shearwater_frame02.png", "manx_shearwater/manx_shearwater_frame03.png"], backgrounds: ["manx_shearwater/background_png-manx_shearwater_frame01.png", "manx_shearwater/background_png-manx_shearwater_frame02.png", "manx_shearwater/background_png-manx_shearwater_frame03.png"], sound: "manx_shearwater/manx_shearwater_sound.wav" }
,
    { name: 'marmoset', frames: ["marmoset/marmoset_frame01.png", "marmoset/marmoset_frame02.png", "marmoset/marmoset_frame03.png"], backgrounds: ["marmoset/background_png-marmoset_frame01.png", "marmoset/background_png-marmoset_frame02.png", "marmoset/background_png-marmoset_frame03.png"], sound: "marmoset/marmoset_sound.wav" }
,
    { name: 'meerkat', frames: ["meerkat/meerkat_frame01.png", "meerkat/meerkat_frame02.png", "meerkat/meerkat_frame03.png"], backgrounds: ["meerkat/background_png-meerkat_frame01.png", "meerkat/background_png-meerkat_frame02.png", "meerkat/background_png-meerkat_frame03.png"], sound: "meerkat/meerkat_sound.wav" }
,
    { name: 'mouse', frames: ["mouse/mouse_frame01.png", "mouse/mouse_frame02.png", "mouse/mouse_frame03.png"], backgrounds: ["mouse/background_png-mouse_frame01.png", "mouse/background_png-mouse_frame02.png", "mouse/background_png-mouse_frame03.png"], sound: "mouse/mouse_sound.wav" }
,
    { name: 'opossum', frames: ["opossum/opossum_frame01.png", "opossum/opossum_frame02.png", "opossum/opossum_frame03.png"], backgrounds: ["opossum/background_png-opossum_frame01.png", "opossum/background_png-opossum_frame02.png", "opossum/background_png-opossum_frame03.png"], sound: "opossum/opossum_sound.wav" }
,
    { name: 'otter', frames: ["otter/otter_frame01.png", "otter/otter_frame02.png", "otter/otter_frame03.png"], backgrounds: ["otter/background_png-otter_frame01.png", "otter/background_png-otter_frame02.png", "otter/background_png-otter_frame03.png"], sound: "otter/otter_sound.wav" }
,
    { name: 'owl', frames: ["owl/owl_frame01.png", "owl/owl_frame02.png", "owl/owl_frame03.png"], backgrounds: ["owl/background_png-owl_frame01.png", "owl/background_png-owl_frame02.png", "owl/background_png-owl_frame03.png"], sound: "owl/owl_sound.wav" }
,
    { name: 'panda', frames: ["panda/panda_frame01.png", "panda/panda_frame02.png", "panda/panda_frame03.png"], backgrounds: ["panda/background_png-panda_frame01.png", "panda/background_png-panda_frame02.png", "panda/background_png-panda_frame03.png"], sound: "panda/panda_sound.wav" }
,
    { name: 'parakeet', frames: ["parakeet/parakeet_frame01.png", "parakeet/parakeet_frame02.png", "parakeet/parakeet_frame03.png"], backgrounds: ["parakeet/background_png-parakeet_frame01.png", "parakeet/background_png-parakeet_frame02.png", "parakeet/background_png-parakeet_frame03.png"], sound: "parakeet/parakeet_sound.wav" }
,
    { name: 'penguin', frames: ["penguin/penguin_frame01.png", "penguin/penguin_frame02.png", "penguin/penguin_frame03.png"], backgrounds: ["penguin/background_png-penguin_frame01.png", "penguin/background_png-penguin_frame02.png", "penguin/background_png-penguin_frame03.png"], sound: "penguin/penguin_sound.wav" }
,
    { name: 'piglet', frames: ["piglet/piglet_frame01.png", "piglet/piglet_frame02.png", "piglet/piglet_frame03.png"], backgrounds: ["piglet/background_png-piglet_frame01.png", "piglet/background_png-piglet_frame02.png", "piglet/background_png-piglet_frame03.png"], sound: "piglet/piglet_sound.wav" }
,
    { name: 'pika', frames: ["pika/pika_frame01.png", "pika/pika_frame02.png", "pika/pika_frame03.png"], backgrounds: ["pika/background_png-pika_frame01.png", "pika/background_png-pika_frame02.png", "pika/background_png-pika_frame03.png"], sound: "pika/pika_sound.wav" }
,
    { name: 'pomeranian', frames: ["pomeranian/pomeranian_frame01.png", "pomeranian/pomeranian_frame02.png", "pomeranian/pomeranian_frame03.png"], backgrounds: ["pomeranian/background_png-pomeranian_frame01.png", "pomeranian/background_png-pomeranian_frame02.png", "pomeranian/background_png-pomeranian_frame03.png"], sound: "pomeranian/pomeranian_sound.wav" }
,
    { name: 'prairie_dog', frames: ["prairie_dog/prairie_dog_frame01.png", "prairie_dog/prairie_dog_frame02.png", "prairie_dog/prairie_dog_frame03.png"], backgrounds: ["prairie_dog/background_png-prairie_dog_frame01.png", "prairie_dog/background_png-prairie_dog_frame02.png", "prairie_dog/background_png-prairie_dog_frame03.png"], sound: "prairie_dog/prairie_dog_sound.wav" }
,
    { name: 'puppy', frames: ["puppy/puppy_frame01.png", "puppy/puppy_frame02.png", "puppy/puppy_frame03.png"], backgrounds: ["puppy/background_png-puppy_frame01.png", "puppy/background_png-puppy_frame02.png", "puppy/background_png-puppy_frame03.png"], sound: "puppy/puppy_sound.wav" }
,
    { name: 'quail', frames: ["quail/quail_frame01.png", "quail/quail_frame02.png", "quail/quail_frame03.png"], backgrounds: ["quail/background_png-quail_frame01.png", "quail/background_png-quail_frame02.png", "quail/background_png-quail_frame03.png"], sound: "quail/quail_sound.wav" }
,
    { name: 'rabbit', frames: ["rabbit/rabbit_frame01.png", "rabbit/rabbit_frame02.png", "rabbit/rabbit_frame03.png"], backgrounds: ["rabbit/background_png-rabbit_frame01.png", "rabbit/background_png-rabbit_frame02.png", "rabbit/background_png-rabbit_frame03.png"], sound: "rabbit/rabbit_sound.wav" }
,
    { name: 'rain', frames: ["rain/rain_frame01.png", "rain/rain_frame02.png", "rain/rain_frame03.png"], backgrounds: ["rain/background_png-rain_frame01.png", "rain/background_png-rain_frame02.png", "rain/background_png-rain_frame03.png"], sound: "rain/rain_sound.wav" }
,
    { name: 'red_panda', frames: ["red_panda/red_panda_frame01.png", "red_panda/red_panda_frame02.png", "red_panda/red_panda_frame03.png"], backgrounds: ["red_panda/background_png-red_panda_frame01.png", "red_panda/background_png-red_panda_frame02.png", "red_panda/background_png-red_panda_frame03.png"], sound: "red_panda/red_panda_sound.wav" }
,
    { name: 'robin', frames: ["robin/robin_frame01.png", "robin/robin_frame02.png", "robin/robin_frame03.png"], backgrounds: ["robin/background_png-robin_frame01.png", "robin/background_png-robin_frame02.png", "robin/background_png-robin_frame03.png"], sound: "robin/robin_sound.wav" }
,
    { name: 'sandpiper', frames: ["sandpiper/sandpiper_frame01.png", "sandpiper/sandpiper_frame02.png", "sandpiper/sandpiper_frame03.png"], backgrounds: ["sandpiper/background_png-sandpiper_frame01.png", "sandpiper/background_png-sandpiper_frame02.png", "sandpiper/background_png-sandpiper_frame03.png"], sound: "sandpiper/sandpiper_sound.wav" }
,
    { name: 'sea_lion', frames: ["sea_lion/sea_lion_frame01.png", "sea_lion/sea_lion_frame02.png", "sea_lion/sea_lion_frame03.png"], backgrounds: ["sea_lion/background_png-sea_lion_frame01.png", "sea_lion/background_png-sea_lion_frame02.png", "sea_lion/background_png-sea_lion_frame03.png"], sound: "sea_lion/sea_lion_sound.wav" }
,
    { name: 'seal', frames: ["seal/seal_frame01.png", "seal/seal_frame02.png", "seal/seal_frame03.png"], backgrounds: ["seal/background_png-seal_frame01.png", "seal/background_png-seal_frame02.png", "seal/background_png-seal_frame03.png"], sound: "seal/seal_sound.wav" }
,
    { name: 'shrew', frames: ["shrew/shrew_frame01.png", "shrew/shrew_frame02.png", "shrew/shrew_frame03.png"], backgrounds: ["shrew/background_png-shrew_frame01.png", "shrew/background_png-shrew_frame02.png", "shrew/background_png-shrew_frame03.png"], sound: "shrew/shrew_sound.wav" }
,
    { name: 'sloth', frames: ["sloth/sloth_frame01.png", "sloth/sloth_frame02.png", "sloth/sloth_frame03.png"], backgrounds: ["sloth/background_png-sloth_frame01.png", "sloth/background_png-sloth_frame02.png", "sloth/sloth_frame03.png"], sound: "sloth/sloth_sound.wav" }
,
    { name: 'sparrow', frames: ["sparrow/sparrow_frame01.png", "sparrow/sparrow_frame02.png", "sparrow/sparrow_frame03.png"], backgrounds: ["sparrow/background_png-sparrow_frame01.png", "sparrow/background_png-sparrow_frame02.png", "sparrow/background_png-sparrow_frame03.png"], sound: "sparrow/sparrow_sound.wav" }
,
    { name: 'squirrel', frames: ["squirrel/squirrel_frame01.png", "squirrel/squirrel_frame02.png", "squirrel/squirrel_frame03.png"], backgrounds: ["squirrel/background_png-squirrel_frame01.png", "squirrel/background_png-squirrel_frame02.png", "squirrel/background_png-squirrel_frame03.png"], sound: "squirrel/squirrel_sound.wav" }
,
    { name: 'stoat', frames: ["stoat/stoat_frame01.png", "stoat/stoat_frame02.png", "stoat/stoat_frame03.png"], backgrounds: ["stoat/background_png-stoat_frame01.png", "stoat/background_png-stoat_frame02.png", "stoat/background_png-stoat_frame03.png"], sound: "stoat/stoat_sound.wav" }
,
    { name: 'sugar_glider', frames: ["sugar_glider/sugar_glider_frame01.png", "sugar_glider/sugar_glider_frame02.png", "sugar_glider/sugar_glider_frame03.png"], backgrounds: ["sugar_glider/background_png-sugar_glider_frame01.png", "sugar_glider/background_png-sugar_glider_frame02.png", "sugar_glider/background_png-sugar_glider_frame03.png"], sound: "sugar_glider/sugar_glider_sound.wav" }
,
    { name: 'tapir', frames: ["tapir/tapir_frame01.png", "tapir/tapir_frame02.png", "tapir/tapir_frame03.png"], backgrounds: ["tapir/background_png-tapir_frame01.png", "tapir/background_png-tapir_frame02.png", "tapir/background_png-tapir_frame03.png"], sound: "tapir/tapir_sound.wav" }
,
    { name: 'toucan', frames: ["toucan/toucan_frame01.png", "toucan/toucan_frame02.png", "toucan/toucan_frame03.png"], backgrounds: ["toucan/background_png-toucan_frame01.png", "toucan/background_png-toucan_frame02.png", "toucan/background_png-toucan_frame03.png"], sound: "toucan/toucan_sound.wav" }
,
    { name: 'train_horn', frames: ["train_horn/train_horn_frame01.png", "train_horn/train_horn_frame02.png", "train_horn/train_horn_frame03.png"], backgrounds: ["train_horn/background_png-train_horn_frame01.png", "train_horn/background_png-train_horn_frame02.png", "train_horn/background_png-train_horn_frame03.png"], sound: "train_horn/train_horn_sound.wav" }
,
    { name: 'tree_frog', frames: ["tree_frog/tree_frog_frame01.png", "tree_frog/tree_frog_frame02.png", "tree_frog/tree_frog_frame03.png"], backgrounds: ["tree_frog/background_png-tree_frog_frame01.png", "tree_frog/background_png-tree_frog_frame02.png", "tree_frog/background_png-tree_frog_frame03.png"], sound: "tree_frog/tree_frog_sound.wav" }
,
    { name: 'turkey', frames: ["turkey/turkey_frame01.png", "turkey/turkey_frame02.png", "turkey/turkey_frame03.png"], backgrounds: ["turkey/background_png-turkey_frame01.png", "turkey/background_png-turkey_frame02.png", "turkey/background_png-turkey_frame03.png"], sound: "turkey/turkey_sound.wav" }
,
    { name: 'wallaby', frames: ["wallaby/wallaby_frame01.png", "wallaby/wallaby_frame02.png", "wallaby/wallaby_frame03.png"], backgrounds: ["wallaby/background_png-wallaby_frame01.png", "wallaby/background_png-wallaby_frame02.png", "wallaby/background_png-wallaby_frame03.png"], sound: "wallaby/wallaby_sound.wav" }
,
    { name: 'warbler', frames: ["warbler/warbler_frame01.png", "warbler/warbler_frame02.png", "warbler/warbler_frame03.png"], backgrounds: ["warbler/background_png-warbler_frame01.png", "warbler/background_png-warbler_frame02.png", "warbler/background_png-warbler_frame03.png"], sound: "warbler/warbler_sound.wav" }
,
    { name: 'weasel', frames: ["weasel/weasel_frame01.png", "weasel/weasel_frame02.png", "weasel/weasel_frame03.png"], backgrounds: ["weasel/background_png-weasel_frame01.png", "weasel/background_png-weasel_frame02.png", "weasel/background_png-weasel_frame03.png"], sound: "weasel/weasel_sound.wav" }
,
    { name: 'whistle', frames: ["whistle/whistle_frame01.png", "whistle/whistle_frame02.png", "whistle/whistle_frame03.png"], backgrounds: ["whistle/background_png-whistle_frame01.png", "whistle/background_png-whistle_frame02.png", "whistle/background_png-whistle_frame03.png"], sound: "whistle/whistle_sound.wav" }
,
    { name: 'wind', frames: ["wind/wind_frame01.png", "wind/wind_frame02.png", "wind/wind_frame03.png"], backgrounds: ["wind/background_png-wind_frame01.png", "wind/background_png-wind_frame02.png", "wind/background_png-wind_frame03.png"], sound: "wind/wind_sound.wav" }
,
    { name: 'wombat', frames: ["wombat/wombat_frame01.png", "wombat/wombat_frame02.png", "wombat/wombat_frame03.png"], backgrounds: ["wombat/background_png-wombat_frame01.png", "wombat/background_png-wombat_frame02.png", "wombat/background_png-wombat_frame03.png"], sound: "wombat/wombat_sound.wav" }
,
    { name: 'woodpecker', frames: ["woodpecker/woodpecker_frame01.png", "woodpecker/woodpecker_frame02.png", "woodpecker/woodpecker_frame03.png"], backgrounds: ["woodpecker/background_png-woodpecker_frame01.png", "woodpecker/background_png-woodpecker_frame02.png", "woodpecker/background_png-woodpecker_frame03.png"], sound: "woodpecker/woodpecker_sound.wav" }
,
    { name: 'wren', frames: ["wren/wren_frame01.png", "wren/wren_frame02.png", "wren/wren_frame03.png"], backgrounds: ["wren/background_png-wren_frame01.png", "wren/background_png-wren_frame02.png", "wren/background_png-wren_frame03.png"], sound: "wren/wren_sound.wav" }
];
// --- State ---
let currentIndex = 0;
let isRandom = true; // Random mode by default
let animationTimeout;
let audio;
let isPlaying = false; // FIXED: Declare isPlaying variable
let imagesPreloaded = false;

function stopAudio() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio = null;
    }
}

function stopAnimation() {
    isPlaying = false;
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
}

const imgElement = document.getElementById('animal-image');
const modeButton = document.getElementById('mode-toggle');

// Preload all images into DOM
function preloadImages() {
    return new Promise((resolve) => {
        const preloadContainer = document.createElement('div');
        preloadContainer.id = 'preload-container';
        preloadContainer.style.display = 'none';
        
        let totalImages = 0;
        let loadedImages = 0;
        
        // Count total images first
        animals.forEach(animal => {
            totalImages += animal.frames.length;
            totalImages += animal.backgrounds.length;
        });
        
        const progressFill = document.getElementById('progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        
        function updateProgress() {
            const percent = Math.round((loadedImages / totalImages) * 100);
            if (progressFill) progressFill.style.width = percent + '%';
            if (progressPercent) progressPercent.textContent = percent + '%';
            
            if (loadedImages === totalImages) {
                // Hide loading screen
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
                imagesPreloaded = true;
                resolve();
            }
        }
        
        animals.forEach(animal => {
            // Preload frames
            animal.frames.forEach(frame => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    updateProgress();
                };
                img.onerror = () => {
                    loadedImages++;
                    updateProgress();
                };
                img.src = frame;
                preloadContainer.appendChild(img);
            });
            
            // Preload backgrounds
            animal.backgrounds.forEach(bg => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    updateProgress();
                };
                img.onerror = () => {
                    loadedImages++;
                    updateProgress();
                };
                img.src = bg;
                preloadContainer.appendChild(img);
            });
        });
        
        document.body.appendChild(preloadContainer);
    });
}

// Loading animal - images already preloaded
async function loadAnimal(index) {
    const animal = animals[index];
    if (!animal) return;
    
    document.body.style.backgroundImage = `url(${animal.backgrounds[0]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    imgElement.src = animal.frames[0];
}

async function playAudio(url) {
    if (!url) return null;
    try {
        audio = new Audio(url);
        await audio.play();
        return audio;
    } catch (error) {
        console.error('Audio play failed:', error);
        return null;
    }
}

function playAnimation() {
    if (isPlaying) return;
    isPlaying = true;
    
    const animal = animals[currentIndex];
    if (!animal) {
        isPlaying = false;
        return;
    }

    let frameIndex = 0;
    let animationDuration = 1500; // Default duration in ms

    // Set initial frame and background immediately to prevent black flash
    imgElement.src = animal.frames[0];
    document.body.style.backgroundImage = `url(${animal.backgrounds[0]})`;

    // Play audio and get duration
    const audioPromise = playAudio(animal.sound);
    
    audioPromise.then(audioObj => {
        if (audioObj) {
            // Wait for metadata to be loaded to get duration
            audioObj.onloadedmetadata = () => {
                animationDuration = audioObj.duration * 1000; // Convert to ms
            };
            
            // If metadata already loaded
            if (audioObj.duration) {
                animationDuration = audioObj.duration * 1000;
            }
            
            // Stop animation when audio ends
            audioObj.addEventListener('ended', () => {
                stopAnimation();
            }, { once: true });
        } else {
            // No audio or failed, use default duration
            setTimeout(() => {
                stopAnimation();
            }, animationDuration);
        }
    }).catch(() => {
        // Audio failed, use default duration
        setTimeout(() => {
            stopAnimation();
        }, animationDuration);
    });

    // Start animation with first frame already set, so start from frame 1
    frameIndex = 1;
    
    // Animate frames at 3 fps (333ms per frame)
    const animate = () => {
        if (!isPlaying) {
            clearTimeout(animationTimeout);
            return;
        }
        
        if (animal.frames[frameIndex]) {
            imgElement.src = animal.frames[frameIndex];
            document.body.style.backgroundImage = `url(${animal.backgrounds[frameIndex]})`;
        }
        
        frameIndex = (frameIndex + 1) % animal.frames.length;
        animationTimeout = setTimeout(animate, 333); // ~3 frames per second
    };
    
    animationTimeout = setTimeout(animate, 333);
}

// Handle URL parameters for shortcuts and features
function handleUrlParameters() {
    if (requestedAnimal) {
        const index = animals.findIndex(a => a.name === requestedAnimal);
        if (index !== -1) {
            currentIndex = index;
        }
    }

    if (action === 'random') {
        currentIndex = Math.floor(Math.random() * animals.length);
    }

    if (noteAction === 'new') {
        showNoteInterface();
        return; // Don't load animal if in note mode
    }

    if (window.location.pathname.includes('/share')) {
        showShareInterface();
        return;
    }

    loadAnimal(currentIndex);
}

// Show simple note-taking interface
function showNoteInterface() {
    document.body.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2>New Note</h2>
            <textarea id="note-text" rows="10" cols="50" placeholder="Type your note here..."></textarea>
            <br>
            <button onclick="saveNote()" style="margin-top: 10px;">Save Note</button>
            <button onclick="location.href='/'">Back to App</button>
        </div>
    `;
}

// Show simple share interface
function showShareInterface() {
    document.body.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2>Share</h2>
            <form method="POST" enctype="multipart/form-data">
                <input type="text" name="title" placeholder="Title"><br>
                <textarea name="text" placeholder="Text to share"></textarea><br>
                <input type="url" name="url" placeholder="URL"><br>
                <input type="file" name="files" accept="image/*,audio/*" multiple><br>
                <button type="submit">Share</button>
            </form>
            <button onclick="location.href='/'">Back to App</button>
        </div>
    `;
}

// Save note (simple implementation)
function saveNote() {
    const noteText = document.getElementById('note-text').value;
    if (noteText) {
        // In a real app, this would save to storage or server
        localStorage.setItem('note_' + Date.now(), noteText);
        alert('Note saved!');
    }
    location.href = '/';
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW registered:', registration);
            // Register periodic background sync
            if ('periodicSync' in registration) {
                registration.periodicSync.register('periodic-data-sync', {
                    minInterval: 24 * 60 * 60 * 1000 // 24 hours
                }).then(() => {
                    console.log('Periodic sync registered');
                }).catch(error => {
                    console.error('Periodic sync registration failed:', error);
                });
            }
        })
        .catch(error => {
            console.error('SW registration failed:', error);
        });
}

// Request notification permission and subscribe to push
async function requestNotificationPermission() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted');
            subscribeToPush();
        } else {
            console.log('Notification permission denied');
        }
    }
}

// Subscribe to push notifications
async function subscribeToPush() {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY') // Replace with actual key
        });
        console.log('Push subscription:', subscription);
        // In a real app, send subscription to server
        return subscription;
    } catch (error) {
        console.error('Push subscription failed:', error);
    }
}

// Register background sync
async function registerBackgroundSync() {
    try {
        const registration = await navigator.serviceWorker.ready;
        if ('sync' in registration) {
            await registration.sync.register('background-sync');
            console.log('Background sync registered');
        }
    } catch (error) {
        console.error('Background sync registration failed:', error);
    }
}

// Utility function for VAPID key conversion
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', async () => {
    await preloadImages();

    // Register for notifications and push
    requestNotificationPermission();

    // Register background sync
    registerBackgroundSync();

    // Handle URL parameters after images loaded
    handleUrlParameters();

    const display = document.getElementById('animal-display');
    if (display) {
        display.addEventListener('touchstart', playCurrent, { passive: true });
        display.addEventListener('click', playCurrent);
    }
});

function playCurrent() {
    stopAnimation();
    stopAudio();
    loadAnimal(currentIndex);
    playAnimation();
}

const leftControl = document.getElementById('control-left');
if (leftControl) {
    leftControl.addEventListener('click', () => {
        stopAudio();
        stopAnimation();
        currentIndex = (currentIndex - 1 + animals.length) % animals.length;
        loadAnimal(currentIndex);
        playAnimation();
    });
}

const rightControl = document.getElementById('control-right');
if (rightControl) {
    rightControl.addEventListener('click', () => {
        stopAudio();
        stopAnimation();
        currentIndex = Math.floor(Math.random() * animals.length);
        loadAnimal(currentIndex);
        playAnimation();
    });
}

if (modeButton) {
    modeButton.addEventListener('click', () => {
        isRandom = !isRandom;
        modeButton.textContent = isRandom ? 'Switch to Serial Mode' : 'Switch to Random Mode';
    });
}

if (imgElement) {
    imgElement.addEventListener('contextmenu', e => e.preventDefault());
}

// Initial load
loadAnimal(currentIndex);
