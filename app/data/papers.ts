export interface Paper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  tags: string[];
  publishedDate: string;
  journal?: string;
  doi?: string;
}

export const DUMMY_PAPERS: Paper[] = [
  {
    id: '1',
    title: 'The Complexity of Euclidian 2 Dimension Travelling Salesman',
    authors: 'Carlos Barron-Romero',
    abstract: 'This paper presents the differences between two NP problems. It focuses in the Euclidian 2 Dimension Travelling Salesman Problems and General Assign Problems.',
    tags: ['cs.DS', 'cs.CC'],
    publishedDate: '2024-01',
    journal: 'Journal of Algorithms',
    doi: '10.1234/algo.2024.001'
  },
  {
    id: '2',
    title: 'Massive Connectivity with Massive MIMO-Part II: Achievable Rate Characterization',
    authors: 'Liang Liu and Wei Yu',
    abstract: 'This paper investigates the fundamental limits of massive connectivity in a massive MIMO system where a large number of devices communicate with a base station equipped with a large number of antennas.',
    tags: ['cs.IT', 'cs.NI'],
    publishedDate: '2024-02',
    journal: 'IEEE Transactions on Communications',
    doi: '10.1109/tcomm.2024.0002'
  },
  {
    id: '3',
    title: 'Deep Learning Approaches to Protein Structure Prediction',
    authors: 'Sarah Chen, David Kim, Robert Johnson',
    abstract: 'A comprehensive review of modern deep learning techniques applied to the challenging problem of protein structure prediction, with emphasis on transformer-based architectures.',
    tags: ['cs.LG', 'q-bio.BM'],
    publishedDate: '2024-01',
    journal: 'Nature Machine Intelligence',
    doi: '10.1038/nmi.2024.003'
  },
  {
    id: '4',
    title: 'Quantum Supremacy Using a Programmable Superconducting Processor',
    authors: 'John Martinez, Emily Wong, et al.',
    abstract: 'Demonstration of quantum supremacy using a programmable superconducting processor, performing a specific computation far beyond the capabilities of current classical computers.',
    tags: ['quant-ph', 'cs.ET'],
    publishedDate: '2024-02',
    journal: 'Science',
    doi: '10.1126/science.2024.004'
  },
  {
    id: '5',
    title: 'Efficient Transformers: A Survey',
    authors: 'Michael Brown, Lisa Anderson',
    abstract: 'A comprehensive survey of various approaches to improve the efficiency of transformer models, including sparse attention mechanisms and linear complexity variants.',
    tags: ['cs.LG', 'cs.CL'],
    publishedDate: '2024-01',
    journal: 'ACM Computing Surveys',
    doi: '10.1145/cs.2024.005'
  },
  {
    id: '6',
    title: 'Privacy-Preserving Federated Learning: Challenges and Solutions',
    authors: 'Alex Thompson, Maria Garcia',
    abstract: 'An analysis of current challenges in privacy-preserving federated learning and proposed solutions, including differential privacy and secure aggregation protocols.',
    tags: ['cs.CR', 'cs.LG'],
    publishedDate: '2024-02',
    journal: 'Journal of Privacy and Security',
    doi: '10.1007/privacy.2024.006'
  },
  {
    id: '7',
    title: 'Sustainable Computing: Energy-Efficient Algorithms',
    authors: 'James Wilson, Rachel Green',
    abstract: 'Investigation of energy-efficient algorithms and their implementation in modern computing systems, with focus on reducing carbon footprint of large-scale computations.',
    tags: ['cs.DC', 'cs.PF'],
    publishedDate: '2024-01',
    journal: 'Sustainable Computing',
    doi: '10.1016/scomp.2024.007'
  },
  {
    id: '8',
    title: 'Advanced Techniques in Graph Neural Networks',
    authors: 'Thomas Lee, Sarah Miller',
    abstract: 'Novel approaches to graph neural networks, introducing new architectures for better representation learning on graph-structured data.',
    tags: ['cs.LG', 'cs.AI'],
    publishedDate: '2024-02',
    journal: 'ICLR 2024',
    doi: '10.1234/iclr.2024.008'
  },
  {
    id: '9',
    title: 'Blockchain Scalability: Layer 2 Solutions',
    authors: 'Daniel White, Jennifer Black',
    abstract: 'Analysis of various Layer 2 scaling solutions for blockchain networks, comparing their efficiency, security, and decentralization properties.',
    tags: ['cs.CR', 'cs.DC'],
    publishedDate: '2024-01',
    journal: 'IEEE Blockchain',
    doi: '10.1109/blockchain.2024.009'
  },
  {
    id: '10',
    title: 'Autonomous Driving: Multi-Agent Reinforcement Learning',
    authors: 'Kevin Zhang, Laura Martinez',
    abstract: 'Novel multi-agent reinforcement learning approaches for autonomous driving, focusing on coordination and safety in complex traffic scenarios.',
    tags: ['cs.AI', 'cs.RO'],
    publishedDate: '2024-02',
    journal: 'Robotics and Autonomous Systems',
    doi: '10.1016/robot.2024.010'
  }
]; 