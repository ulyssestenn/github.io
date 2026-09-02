# Accuracy, Precision, Resolution, and Sensitivity: What Is the Difference?
**Author:** Annie

A sensor can display a very fine number without measuring the world that accurately. Four measurement terms explain why.

A phone sensor might report `1000.23 hPa`. The two decimal places look reassuringly exact. They do not mean the pressure is known to within 0.01 hPa.

Digital instruments make it easy to confuse the fineness of a displayed number with the quality of the measurement behind it. Accuracy, precision, resolution, and sensitivity describe different parts of that quality. A sensor can be good at one and mediocre at another.

Curious Air makes this distinction unusually visible because its Capabilities screen can show the range and resolution that Android reports for sensors installed in the phone. Those are useful specifications. They are not a certificate that every displayed value is equally close to the truth.

## Resolution is the smallest change the instrument can distinguish

The International Vocabulary of Metrology defines resolution as the smallest change in the quantity being measured that causes a perceptible change in the instrument's indication.

Suppose a pressure sensor has a reported resolution of 0.1 hPa. In simple terms, changes smaller than that may not produce a distinguishable step in its output. Android exposes this property through `Sensor.getResolution()`, in the sensor's own units.

Resolution tells you about the granularity of the measurement. It does not tell you how close the measurement is to the true pressure.

A badly calibrated instrument can have excellent resolution. Imagine a scale that resolves changes of 1 gram but is always 40 grams too high. It can notice tiny changes while remaining wrong about the absolute value.

This is why extra decimal places are not evidence of extra accuracy. Software can display only the values the sensor supplies, and the sensor can supply finely spaced values that still contain bias, drift, noise, or calibration error.

## Precision is about repeatability

Precision asks a different question: if you measure the same thing repeatedly under specified conditions, how closely do the results agree with one another?

If a stationary sensor reports 1000.2, 1000.2, 1000.3, and 1000.2 hPa, the readings are tightly clustered. That is evidence of good precision under those conditions.

Now suppose a trusted reference instrument says the actual pressure is 1001.0 hPa. The phone can be precise and still systematically low.

Precision therefore becomes especially important when your question is comparative. If you want to know whether a reading changed after you moved the phone, changed the lighting, climbed a hill, or brought a magnet closer, repeatability determines whether a small apparent difference rises above the ordinary scatter in the readings.

One reading cannot tell you much about precision. You need repetition.

## Accuracy is closeness to the value you are trying to measure

Metrology uses accuracy for closeness between a measured value and the true value of the measurand. The formal vocabulary is careful here: accuracy is a qualitative concept, not a number that should casually be written as something like “accuracy = 0.2.” Quantitative error or uncertainty needs a properly specified basis.

That has a practical consequence for phone sensors. To establish absolute accuracy, you usually need a trustworthy reference, a manufacturer's characterized specification, a calibration procedure, or some other justified way to know what the value should be.

Android also has sensor-status labels such as high, medium, low, and unreliable accuracy. Curious Air can surface those status values for supported sensor views. They are useful indicators of the state Android is reporting, especially when calibration may matter. They are not the same thing as a calibrated statement that a reading is within a particular number of lux, microteslas, degrees, or hectopascals of the truth.

If the question is “did the value rise when I changed this condition?”, absolute accuracy may not be the most important property. If the question is “is the true value 42.0?”, it matters enormously.

## Sensitivity is how strongly the output responds to a change in the input

Sensitivity is easy to confuse with both resolution and accuracy.

The metrology definition is the change in a measuring system's indication divided by the corresponding change in the quantity being measured. It is essentially the slope of the instrument's response.

A sensor with greater sensitivity produces a larger output change for the same physical input change. That can make small variations easier to detect, but sensitivity alone does not guarantee that the readings are accurate or stable.

Resolution asks whether a small input change can be distinguished. Sensitivity asks how much the indication moves when the input changes. Precision asks whether repeated measurements agree. Accuracy asks whether the result is close to the value being measured.

## The four terms answer four different questions

| Property | Practical question | What it does not prove |
| --- | --- | --- |
| **Resolution** | How small a change can produce a distinguishable step? | That the step is close to the true value |
| **Precision** | How closely do repeated measurements agree? | That the cluster is centered on the truth |
| **Accuracy** | How close is the measurement to the value being measured? | That repeated readings will be tightly clustered |
| **Sensitivity** | How much does the indication change when the input changes? | That the response is accurate, precise, or finely resolved |

The mistake is not choosing the wrong winner among these properties. There is no winner. The right property depends on what you are trying to learn.

## For exploratory phone measurements, match the claim to the instrument

Phone sensors are often very useful when the question is modest and comparative.

If Curious Air shows that the ambient-light reading changes dramatically when a lamp is switched on, you have observed a real response in that phone's light-sensor output. If several repeated before-and-after measurements show the same pattern, the comparison becomes more convincing.

That still does not justify claiming that the room has been measured to laboratory photometry standards.

The same rule applies to magnetic field, pressure, motion, proximity, and other phone sensors. Relative changes can answer many ordinary questions even when absolute calibration is unknown. Safety-critical, regulatory, medical, or laboratory claims require instruments and procedures designed for those jobs.

Curious Air's Capabilities view helps you inspect what the device itself reports: sensor name and vendor, range, resolution, update-rate information, power use, and other Android metadata. Read those fields as clues about what the sensor can produce, not as a promise about what the physical world must be doing.

A number with more digits can look more scientific. The more scientific move is to ask what those digits actually mean.

## Sources

- Joint Committee for Guides in Metrology: [VIM 2.13: measurement accuracy](https://jcgm.bipm.org/vim/en/2.13.html), [VIM 2.15: measurement precision](https://jcgm.bipm.org/vim/en/2.15.html), [VIM 4.12: sensitivity](https://jcgm.bipm.org/vim/en/4.12.html), and [VIM 4.14: resolution](https://jcgm.bipm.org/vim/en/4.14.html).
- Android Developers: [Sensor API reference](https://developer.android.com/reference/android/hardware/Sensor) and [Sensors Overview](https://developer.android.com/develop/sensors-and-location/sensors/sensors_overview). Android exposes sensor maximum range and resolution and reports categorical sensor-accuracy status where supported.

## Product connection

**Curious Air.** Curious Air exposes live readings and Android-reported capabilities for sensors available on your phone. Its Capabilities screen shows properties such as range and resolution so you can inspect what the hardware reports before deciding what a measurement can support. Curious Air is for exploration, not calibrated safety, medical, or laboratory measurement.