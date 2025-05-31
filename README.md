# An Investigation of Real-World Bugs in Triton Programs

This is an academic paper project page template.

## Abstract

As deep learning workloads increasingly depend on custom GPU kernels for performance, Triton has emerged as a Python-based domain-specific language and compiler framework for writing efficient, hardware-aware kernels. Triton’s abstrac-tions, such as tile-based programming and implicit parallelism, enable rapid kernel development, but also introduce new vectors for silent, hard-to-diagnose bugs. Unlike CUDA, Triton removes explicit control over thread scheduling, memory layout, and
synchronization, relying instead on a backend compiler stack that remains largely opaque to the user.

In this paper, we present the first empirical study of bugs in Triton programs. We manually analyze 38 real-world bug reports across Triton’s core repository and popular open-source projects. Our analysis reveals four dominant root cause categories—Memory, Synchronization, Numerical, and Correct-ness and highlights how Triton’s abstractions and compilation pipeline contribute to a new class of failure modes. We further contrast Triton bugs with known GPU, CPU, and DL bug models, showing that existing testing and debugging tools fail to capture Triton-specific issues.

Our findings inform the design of future validation and tooling approaches tailored to Triton’s unique programming model. This work lays the groundwork for understanding and improving the reliability of a rapidly growing component in modern ML infrastructure.

## Website License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
