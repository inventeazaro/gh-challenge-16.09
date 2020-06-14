# Google Cloud Speech-To-Text | For GoHard

This is a Google Cloud Speech-To-Text application with an extensible configuration, made for GoHard.

## Usage

Firstly, all NPM packages must be installed. So, make sure that Node and NPM are installed.
Once those are installed, run the following command in the directory of the project:
```
npm install
```


Once that is finished, you are going to need to get your Google Cloud API keys. [Google
has a good article covering it!](https://cloud.google.com/docs/authentication/getting-started)

After you've set the `GOOGLE_APPLICATION_CREDENTIALS` to the JSON
provided by Google as described in the article, you are ready to start the application!
Running it is as simple as:
```
npm run start
```

You might also want to [configure](#configuration) it!

## Configuration

You've seen the boring default values for the config, what if you want to spice things up a little?

The `config.js` file is just for that! It contains configuration for a lot of things you might want, so check it out!
Everything in there is somewhat well commented, so you probably won't have that bad of a time, at least I hope so. If something in there does not make sense to you, don't hesitate to [contact](#links) me!

Important things are marked with `[!!!!]` in the config, so make sure to read those!

## Drawbacks, and other things to note

The GoHard challenge wanted me to differentiate between speakers, add timestamps, show a character if it's not very confident about a word, and add punctuation, and of top of all that, the test case was in Romanian!

Sadly, I was only able to implement timestamps and confidence marking, since in Romanian, differentiation of speakers does not work, nor does punctuation, however, they work if you set the language to english and change the config a little!

I also cut the test case audio so that it would fit in the quota.

[!!!!] IMPORTANT:
Words or sections of the transcripts that it's not very sure about, will have "???" printed before them. (Well, if you didn't edit the config, that is)

[!!!!] MORE IMPORTANT STUFF:
By default, it beta is set to true, you might not want that

## Links

If you have any questions, [join the Discord server I made just for this](https://discord.gg/a92aeTw).

What is GoHard? [This.](https://gohard.inventeaza.ro/)