# How to Design a Multi-Sensor Logging Session Without Creating Useless Data

**Author:** Annie  
**Format:** Knowledge Guide  
**Status:** draft  
**Product:** Curious Air  
**Research:** `../../agents/annie/research/2026-08-23-product-function-guide-sweep.md`  
**Own Words research-informed humanizing pass:** complete

A phone can expose a surprising number of signals at once. That does not mean you should log all of them.

The easiest way to create a useless sensor dataset is to begin with the available sensors instead of the question. Turn on the accelerometer, gyroscope, barometer, ambient light, magnetometer, and Bluetooth logging, choose the fastest intervals the phone will tolerate, and twenty minutes later you have thousands of rows with no clear reason for any of them to exist.

A useful logging session starts the other way around: decide what change you are trying to observe, then collect only the signals that could help describe it.

## Start with one sentence you want the data to answer

Before choosing a sensor, finish a sentence such as:

- How does the magnetic-field reading change as the phone moves toward and away from this object?
- What happens to ambient light readings as the room lighting changes through the afternoon?
- How does barometric pressure vary during this walk up and down a hill?
- Which Bluetooth LE devices remain visible as I move between these two rooms?
- How much motion does the accelerometer record during this repeated physical setup?

That sentence does two jobs. It tells you what to log, and it tells you what *not* to log.

If the question is about changing light, the gyroscope is probably irrelevant. If the question is about motion, logging nearby Bluetooth devices may add noise without adding information. Collect another signal only when you can say what distinction it might help you make later.

Curious Air Pro allows timed logging from several supported sources, including the magnetometer, accelerometer, gyroscope, ambient light sensor, barometer, and Bluetooth LE. Different sources can use different intervals. That flexibility is useful precisely because the sensible interval for one signal may be absurd for another.

## Use the slowest interval that still captures the change you care about

Faster sampling sounds safer because it feels like preserving more information. It also produces larger files, consumes more power, and can give you hundreds of nearly redundant readings.

Android's own sensor guidance recommends choosing the slowest sampling rate that still meets the application's needs. Device hardware and Android also impose their own limits, so a requested rate is not a guarantee that events will arrive at exactly that cadence.

For a slowly changing environmental signal, such as room light or barometric pressure over several minutes, you usually do not need motion-sensor-style sampling. A reading every few seconds may reveal the pattern perfectly well. For a short motion event, by contrast, an interval of several seconds could miss most of the event.

The interval should follow the timescale of the phenomenon.

A useful test is to ask: **what is the shortest change I would regret failing to see?** Sample comfortably faster than that, then stop. There is little virtue in collecting 100 times more rows than the question can use.

Curious Air validates requested sensor intervals against capabilities reported by the device. That matters because Android phones are not standardized laboratory instruments. Two models may expose different sensors, ranges, resolutions, and practical update rates.

## Run a tiny pilot before the real session

A two-minute test can save an hour of beautifully recorded nonsense.

Start the proposed session and deliberately create the change you expect to study. Move the phone, change the light, walk between the two locations, or perform the planned action. Then stop and inspect the export.

Check three things:

1. **Did the sensor visibly respond?** If the values barely change, either the phenomenon is below the phone's useful resolution or you chose the wrong signal.
2. **Is the interval sensible?** If successive rows are nearly identical, you may be oversampling. If the interesting change happens between readings, sample faster.
3. **Can you tell what happened when?** Sensor rows without contextual timing can be difficult to interpret later.

For the last problem, keep a simple contemporaneous note if the logging tool itself does not record the event you care about. `2:14:30 — moved phone beside speaker` is more useful than trying to reconstruct the experiment from memory two days later.

## Do not collect more variables than you can interpret

There is a temptation to log an extra sensor "just in case." Sometimes that is reasonable. Ten just-in-case sensors are usually not.

Every additional stream creates more possible correlations. With enough columns and enough time points, some relationships will appear merely by chance or because several sensors are responding to the same underlying event. A phone being picked up may change the accelerometer, gyroscope, orientation, light, proximity, and Bluetooth environment at once. Six moving lines do not imply six separate causes.

For an exploratory session, two or three well-chosen signals are often easier to reason about than a wall of synchronized data.

If you genuinely need many streams, decide in advance what each one is supposed to contribute. Write it down. That small discipline makes it much easier to notice later that one column never had a job.

## Keep the physical setup boring

Sensor comparisons become more useful when the setup changes only in the way you intended.

If you are comparing magnetic readings at different distances, keep the phone orientation as consistent as practical. If you are comparing light levels, do not alternate between pointing the sensor toward a lamp and holding it flat on a table unless orientation itself is part of the experiment. If you are comparing BLE visibility between locations, spend roughly comparable amounts of time in each place.

This is not laboratory-grade experimental design. It is simply an attempt to avoid explaining the result with an accidental change you introduced yourself.

It is also worth repeating a short session. A pattern that appears once may be an artifact of the moment. If it appears in several deliberately repeated runs, it becomes more interesting.

## Stop when the question has enough data

Curious Air places a hard limit on logging file size and preserves a reserve of free device storage. Those are useful safeguards, but they should not be the stopping rule for an experiment.

If a ten-minute session answers the question, a two-hour session usually does not make the answer 12 times better. It may only make the graph harder to inspect.

For longer phenomena, longer logging is justified. Pressure over a day is different from accelerometer motion during a 20-second action. Again, the timescale of the question should determine the timescale of the data.

Once the session is finished, export the CSV, graph or summarize the relevant columns, and compare the periods or conditions you actually planned to compare. If the result raises a new question, design a second session for that question rather than asking the first dataset to answer everything.

That is the difference between collecting sensor data and conducting a useful observation. The phone can give you rows very cheaply. Deciding which rows deserve to exist is the scarce part.

## Sources

- Android Developers, [Sensors Overview](https://developer.android.com/develop/sensors-and-location/sensors/sensors_overview). Android documents that available sensors and their capabilities vary by device, that requested sampling delays are not exact guarantees, and recommends choosing the slowest sampling rate that still meets the application's needs.

## Product connection

**Curious Air.** Curious Air Pro can build timed logging sessions from multiple supported phone sensors and Bluetooth LE, with independent intervals for each source and CSV export afterward. It is designed for exploratory measurement, not safety-critical or calibrated laboratory use.