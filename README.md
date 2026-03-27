# Characterizing Real-World Bugs in Tile Programs for Automated Bug Detection

This is an academic paper project page template.

## Abstract

Tile-based programming frameworks are increasingly adopted to write high-performance GPU kernels in
domains such as deep learning and scientific computing. While these frameworks enhance productivity and
hardware utilization, their multi-stage compilation pipelines introduce distinct code generation bugs that are
tightly coupled to input shapes, data types, and backend targets. These bugs often manifest as silent correctness
or performance issues, making them difficult to detect using existing compiler testing tools. Additionally, the
unique programming conventions of tile domain specific languages complicate root cause identification, while
fixing such bugs demands specialized knowledge of tile abstractions and compilation pipelines. Despite the
growing adoption of tile-based systems, their code generation bugs remain largely unexplored. <br>

This paper presents the first systematic study of tile-program code generation bugs. We analyze 301 realworld bug reports from GitHub and categorize their root causes, symptoms, input patterns, test oracles that
trigger these bugs and the strategies used to fix them. Our study provides foundational insights for building
debugging, testing, and repair tools tailored to tile-based compiler infrastructures.
## Website License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
