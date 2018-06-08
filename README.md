# liri-node-app
LIRI is a Language Interpretation and Recognition Interface Bot. She is an improvement over SIRI because she does not start talking at inappropriate or inconvenient times. LIRI lives in the terminal window, where she can take in commands and output data she finds in databases.

Currently, LIRI Bot can understand four commands:

- If you type node liri.js "my-tweets" into the command line, LIRI will return the last 20 tweets of the specified user's account. Currently, LIRI is set up to output tweets from the account of Crusty411, a new, but exceptional Twitter feed.

- If you type node liri.js "spotify-this-song", followed by the name of a song, LIRI will search the Spotify database and return information on the specified song. She will output the the name of the song, the artist, the album, and a link to a preview of the song. If you decide not to include a song name, LIRI will offer her own recommendation. She will suggest a classic of the mid-1990s, "The Sign" by Swedish powerhouse Ace of Base.

- If you type node liri.js "movie-this", followed by the name of a movie, LIRI will scour the OMDB database using your input as a search parameter. She will promptly provide detailed information about your movie, including: movie title, release year, IMDB rating, Rotten Tomatoes rating, country of origin, language, plot and actors. If you do not enter a movie, LIRI will return information on the little known movie "Mr. Nobody."

- Finally, if you type node liri.js "do-what-it-says" into the command line, you are in for a treat! LIRI will retrieve a song recommendation from a text file and search for it in the Spotify database. She will then provide you with information on *** Spoiler Alert *** the late 1990s boy band classic "I Want It That Way" by the Backstreet Boys.

The LIRI bot was built with node.js, using several Node packages, including Twitter, Node-Spotify-API, Request (to access the OMDB API), and DotEnv.
