// Public information supplied by the owner; research sources are recorded in SOURCES.md.
window.siteContent = {
  "profile": {
    "name": "Geunsoo Song",
    "authorName": "Geunsoo Song",
    "initials": "GS",
    "role": "Department of Computer Science and Engineering, Sogang University",
    "researchFocus": "LLM inference optimization, AI systems",
    "department": "Department of Computer Science and Engineering",
    "institution": "Sogang University",
    "location": "Seoul, South Korea",
    "photo": "./assets/profile-portrait.png",
    "photoAlt": "Geunsoo Song at his graduation",
    "email": "hulahula3247@gmail.com",
    "github": "https://github.com/hulahula3247",
    "scholar": "https://scholar.google.com/citations?hl=en&user=i8bV0RMAAAAJ",
    "orcid": "https://orcid.org/0009-0008-6158-7833"
  },
  "updated": "November 2026",
  "researchDemos": [
    {
      "id": "offn-jetson",
      "title": "oFFN",
      "videoTitle": "oFFN: LLM Inference Acceleration",
      "videoDescription": "These videos show inference with the oFFN implementation in llama.cpp. With both oFFN and attention input sparsity enabled, token generation was 3.11× as fast as in the original llama.cpp.",
      "summary": "oFFN predicts which neurons will become zero after ReLU to skip unnecessary FFN computation and weight reads. When the pre-ReLU value is negative, the output becomes zero, allowing the corresponding neuron operations to be skipped. To predict activation efficiently at low cost, oFFN computes the contributions of outlier dimensions exactly and uses a group-based approximation for the remaining dimensions.\n\nFrequently activated hot neurons bypass prediction and are processed on Tensor Cores, while cold neurons perform only the operations needed according to the prediction results. By adapting these execution paths to the batch size, oFFN accelerates inference at batch size one and small batch sizes.\n\nEvaluated on the ReLU-based ProSparse-LLaMA-2-13B model on Jetson AGX Orin, oFFN achieves up to 5.46x speedup for FFN computation and 2.01x for end-to-end decoding over Dense.",
      "paperId": "offn-asplos-2026",
      "figure": {
        "src": "./assets/offn-overview2.png",
        "alt": "oFFN column and row reordering, sparsity prediction, and neuron-aware computation mapping.",
        "width": 6132,
        "height": 2294
      },
      "model": "ProSparse-LLaMA-2-13B (ReLU-fied model)",
      "hardware": "Jetson ORIN AGX 64GB",
      "software": "llama.cpp",
      "ffn": "oFFN (Specificity: 84%)",
      "attention": "Input Sparsity (Sparsity: 50%)",
      "source": "https://aisys.sogang.ac.kr/",
      "videos": [
        {
          "label": "Original(llama.cpp)",
          "url": "./assets/test1.mp4"
        },
        {
          "label": "oFFN",
          "url": "./assets/test3.mp4"
        }
      ]
    },
    {
      "id": "roshift-project",
      "title": "RoShift",
      "summary": "Most modern LLMs use SiLU as their activation function. Unlike ReLU, SiLU rarely produces activations that are naturally zero. Small values are therefore approximated as zero to reduce unnecessary computation and memory accesses, but removing originally nonzero values can reduce model accuracy.\n\nRoShift transforms the model's representation space to accelerate inference while reducing this accuracy loss. Motivated by the observation that post-SiLU activation distributions are off-centered, it introduces Lazy Shift, which shifts their centers to zero and defers the corresponding correction until after FFN computation. It also uses rotations that jointly consider activation and weight information to transform the model's representation space into a form more amenable to sparsification.\n\nAcross five models at 50% uniform sparsity, RoShift achieves an average decoding speedup of 1.60x on the RTX 5090 with minimal accuracy loss.",
      "paperId": "roshift-preprint",
      "figure": {
        "src": "./assets/roshift-overview.png",
        "alt": "RoShift overview: activation- and weight-aware rotation, lazy shift, and fused correction.",
        "width": 7137,
        "height": 1900
      }
    }
  ],
  "competitiveProgramming": [
    {
      "platform": "Codeforces",
      "iconImage": "./assets/codeforces-icon.png",
      "handle": "hulahula32471",
      "url": "https://codeforces.com/profile/hulahula32471",
      "maxRating": 2222
    },
    {
      "platform": "AtCoder",
      "iconImage": "./assets/atcoder-icon.png",
      "handle": "hulahula3247",
      "url": "https://atcoder.jp/users/hulahula3247",
      "maxRating": 2049
    },
    {
      "platform": "solved.ac",
      "iconImage": "./assets/solved-ac-icon.png",
      "handle": "hulahula3247",
      "url": "https://solved.ac/profile/hulahula3247",
      "rank": "Ruby V"
    }
  ],
  "competitiveProgrammingIntro": "I have solved a wide range of problems and participated in various algorithmic programming competitions, earning awards in several of them.",
  "biography": [
    "Hello! I am Geunsoo Song, an M.S. student in Computer Science and Engineering at Sogang University. I am interested in efficient AI system design and accelerating large language model (LLM) inference, which I study from both software and hardware perspectives.",
    "In particular, I am interested in the following two areas."
  ],
  "research": [
    {
      "title": "Activation Sparsity",
      "description": "Activation sparsity accelerates inference by skipping unnecessary operations in a model. For example, when activation values are zero or sufficiently small, the associated weight operations can be skipped to reduce computation and memory accesses. To exploit activation sparsity efficiently, I have also studied predicting sparsity patterns in advance and transforming activation representations to make them more amenable to sparsification."
    },
    {
      "title": "Hardware-aware Optimization",
      "description": "I am interested in HW/SW co-design to ensure that efficient algorithms also deliver high performance on real hardware. To this end, I have developed GPU kernels in CUDA and Triton and used Nsight Systems/Compute to analyze and optimize performance bottlenecks."
    }
  ],
  "publications": [
    {
      "id": "roshift-preprint",
      "selected": true,
      "year": "2027",
      "type": "First author",
      "title": "RoShift: Lazy Shift and Weight-aware Rotation for Activation Sparsity in LLM Inference",
      "authors": [
        "Geunsoo Song",
        "Jiwon Seo",
        "Hoeseok Yang",
        "Youngmin Yi"
      ],
      "venue": "ICLR",
      "venueFull": "International Conference on Learning Representations 2027",
      "venueLabel": "Under review at ICLR 2027",
      "status": "under-review",
      "image": "",
      "imageAlt": "",
      "description": "Training-free lazy shift and activation- and weight-aware rotation for sparse LLM inference.",
      "abstract": "RoShift transforms activations into sparsity-friendly representations without training. Lazy shift recenters SiLU activation distributions around zero and defers correction to the end of the FFN. Activation- and weight-aware rotation reduces sparsification-induced output error. Fusing the corrections required for shifting and rotation translates these gains into decoding speedup.",
      "url": "https://arxiv.org/abs/2611.20549",
      "urlLabel": "arXiv",
      "pdf": "",
      "code": "https://github.com/hulahula3247/RoShift",
      "project": "",
      "acceptance": null,
      "bibtex": ""
    },
    {
      "id": "offn-asplos-2026",
      "selected": true,
      "year": "2026",
      "type": "First author",
      "title": "oFFN: Outlier and Neuron-aware Structured FFN for Fast yet Accurate LLM Inference",
      "authors": [
        "Geunsoo Song",
        "Hoeseok Yang",
        "Youngmin Yi"
      ],
      "venue": "ASPLOS",
      "venueFull": "31st ACM International Conference on Architectural Support for Programming Languages and Operating Systems, Volume 2",
      "venueLabel": "ASPLOS 2026",
      "status": "published",
      "image": "",
      "imageAlt": "",
      "description": "A structured FFN design that jointly exploits activation outliers and hot/cold neuron behavior to accelerate LLM inference.",
      "abstract": "oFFN reorganizes FFN weights across input and output dimensions so activation outliers and hot/cold neurons can be handled together. This supports more accurate sparsity prediction and different computation paths for different neuron groups and batch sizes. The work evaluates the resulting inference efficiency and model accuracy in ReLU-fied large language models.",
      "url": "https://dl.acm.org/doi/10.1145/3779212.3790194",
      "urlLabel": "DOI",
      "pdf": "",
      "code": "",
      "project": "",
      "acceptance": {
        "accepted": 132,
        "submitted": 840,
        "scope": "Volume 2, Summer cycle",
        "source": "https://dl.acm.org/doi/proceedings/10.1145/3779212"
      },
      "bibtex": "@inproceedings{song2026offn,\n  author = {Geunsoo Song and Hoeseok Yang and Youngmin Yi},\n  title = {oFFN: Outlier and Neuron-aware Structured FFN for Fast yet Accurate LLM Inference},\n  booktitle = {Proceedings of the 31st ACM International Conference on Architectural Support for Programming Languages and Operating Systems, Volume 2},\n  series = {ASPLOS '26},\n  year = {2026},\n  pages = {1301--1315},\n  publisher = {Association for Computing Machinery},\n  doi = {10.1145/3779212.3790194},\n  url = {https://doi.org/10.1145/3779212.3790194}\n}"
    },
    {
      "id": "submitted-manuscript",
      "selected": true,
      "year": "2027",
      "type": "Co-first author",
      "title": "Manuscript under review",
      "authors": [],
      "venue": "",
      "venueFull": "",
      "venueLabel": "Under review",
      "status": "under-review",
      "image": "",
      "imageAlt": "",
      "description": "Designed an efficient serving system that leverages activation sparsity for MoE models.",
      "abstract": "",
      "url": "",
      "pdf": "",
      "code": "",
      "project": "",
      "acceptance": null,
      "bibtex": ""
    }
  ],
  "awards": [
    {
      "id": "icpc-apac-2025",
      "featured": true,
      "date": "2025-03",
      "title": "38th place",
      "event": "ICPC Asia Pacific Championship",
      "organization": "National University of Singapore (NUS), Singapore"
    },
    {
      "id": "icpc-seoul-2024",
      "featured": true,
      "date": "2024-11",
      "title": "Encouragement Award (13th place)",
      "event": "ICPC Seoul Regional",
      "organization": "Ministry of Science and ICT, South Korea"
    },
    {
      "id": "lgcpc-2024",
      "featured": true,
      "date": "2024-09",
      "title": "Excellence Award (5th place)",
      "event": "LG Collegiate Programming Contest (LGCPC)",
      "organization": "LG, South Korea"
    },
    {
      "id": "ucpc-2024",
      "featured": false,
      "date": "2024-08",
      "title": "15th place (Fifth-tier Award)",
      "event": "Union of Clubs for Programming Contests (UCPC)",
      "organization": "South Korea"
    },
    {
      "id": "hyundai-mobis-2024",
      "featured": false,
      "date": "2024-07",
      "title": "Encouragement Award (21st place)",
      "event": "Hyundai Mobis Algorithm Contest",
      "organization": "Hyundai Mobis, South Korea"
    },
    {
      "id": "icpc-apac-2024",
      "featured": false,
      "date": "2024-02",
      "title": "42nd place",
      "event": "ICPC Asia Pacific Championship",
      "organization": "VNU University of Engineering and Technology, Vietnam"
    },
    {
      "id": "sogang-pc-2023",
      "placement": 1,
      "featured": true,
      "date": "2023-11",
      "title": "Grand Award (1st place)",
      "event": "Sogang Programming Contest",
      "organization": "Sogang University, South Korea"
    },
    {
      "id": "icpc-seoul-2023",
      "featured": false,
      "date": "2023-11",
      "title": "29th place",
      "event": "ICPC Seoul Regional",
      "organization": "Ministry of Science and ICT, South Korea"
    },
    {
      "id": "hyundai-mobis-2023",
      "featured": false,
      "date": "2023-07",
      "title": "Encouragement Award (28th place)",
      "event": "Hyundai Mobis Algorithm Contest",
      "organization": "Hyundai Mobis, South Korea"
    },
    {
      "id": "sogang-pc-2022",
      "featured": false,
      "date": "2022-11",
      "title": "8th place",
      "event": "Sogang Programming Contest",
      "organization": "Sogang University, South Korea"
    }
  ],
  "education": [
    {
      "period": "2025.03 - Present",
      "title": "Sogang University, M.S. in CSE",
      "organization": "",
      "detail": "Enrolled, expected February 2027",
      "advisor": "Advisor: Prof. Youngmin Yi"
    },
    {
      "period": "2020.03 - 2025.02",
      "title": "Sogang University, Mechanical Engineering & CSE (Double Major)",
      "organization": "",
      "detail": ""
    }
  ],
  "skills": []
};
