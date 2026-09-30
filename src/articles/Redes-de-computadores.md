> Vou tentar resumir ao máximo o que são e como as redes funcionam.

As redes de computadores podem ser definidas como um conjunto de dispositivos interconectados que trocam informações entre si por meio de protocolos de comunicação.
Atualmente elas são divididas em 11 tipos diferentes.
### PAN
**(Personal Area Network)**: Rede de área pessoal com alcance muito curto, conectando dispositivos próximos, geralmente em poucos metros de distância, utilizando tecnologias como **Bluetooth**, NFC ou USB.

### LAN
**(Local Area Network)**: Rede local que conecta dispositivos em um espaço físico limitado, como residências, escritórios, escolas ou laboratórios.

### WLAN
**(Wireless Local Area Network)**: Versão sem fio da LAN, utilizando ondas de rádio para comunicação, normalmente através de redes **Wi-Fi**.

### CAN
**(Campus Area Network)**: Rede que interliga múltiplas LANs em uma área geográfica restrita, como campi universitários, hospitais ou complexos industriais.

### MAN
**(Metropolitan Area Network)**: Rede metropolitana que cobre uma cidade ou região urbana, conectando diversas LANs e CANs.

### WMAN
**(Wireless Metropolitan Area Network)**: Versão sem fio da MAN, geralmente baseada em tecnologias de comunicação de longo alcance.

### RAN
**(Regional Area Network)**: Rede de área regional que cobre uma região geográfica maior que uma MAN, porém menor que uma WAN.

### WAN
**(Wide Area Network)**: Rede de longa distância que conecta computadores e redes localizadas em diferentes cidades, países ou continentes. A **Internet** é o maior exemplo de WAN.

### WWAN
**(Wireless Wide Area Network)**: Rede de longa distância sem fio, baseada em tecnologias de comunicação móvel, como **3G**, **4G** e **5G**.

### SAN
**(Storage Area Network)**: Rede dedicada ao armazenamento de dados, conectando servidores a dispositivos de armazenamento com alta velocidade, disponibilidade e confiabilidade.

### VLAN
**(Virtual Local Area Network)**: Rede local virtual que permite segmentar logicamente uma rede física em múltiplas redes independentes, aumentando a segurança e facilitando o gerenciamento.
## Topologias de redes
A topologia define a forma como os dispositivos estão organizados e conectados dentro de uma rede.
### Estrela

Todos os dispositivos são conectados a um equipamento central, geralmente um **switch**. É a topologia mais utilizada atualmente devido à facilidade de gerenciamento e manutenção.

**Vantagens:**
- Fácil identificação de falhas;
- Expansão simplificada;
- Maior desempenho.

**Desvantagens:**
- Dependência do dispositivo central;
- Maior quantidade de cabeamento.

### Barramento

Todos os dispositivos compartilham um único meio físico de comunicação (barramento).

**Vantagens:**
- Baixo custo;
- Instalação simples.

**Desvantagens:**
- Baixa escalabilidade;
- Uma falha no barramento pode comprometer toda a rede;
- Maior ocorrência de colisões.

### Anel

Os dispositivos são conectados em um circuito fechado, onde os dados trafegam de um equipamento para outro até alcançar o destino.

**Vantagens:**
- Menor ocorrência de colisões;
- Fluxo de dados organizado.

**Desvantagens:**
- Falhas em um ponto podem afetar toda a rede;
- Manutenção mais complexa.

### Malha

Cada dispositivo pode estar conectado a vários outros dispositivos, criando múltiplos caminhos para transmissão de dados.

**Vantagens:**
- Alta disponibilidade;
- Grande tolerância a falhas;
- Redundância de caminhos.

**Desvantagens:**
- Alto custo de implementação;
- Maior complexidade de gerenciamento.

## Componentes básicos

### Hosts
Dispositivos finais que enviam ou recebem dados na rede, como computadores, notebooks, smartphones e servidores.

### Placa de rede (NIC)
Componente responsável por permitir que um dispositivo se conecte à rede.

### Switch
Equipamento que conecta dispositivos dentro de uma LAN, encaminhando quadros de dados com base nos endereços MAC.

### Hub
Equipamento que retransmite os dados para todas as portas indiscriminadamente. Atualmente é pouco utilizado.

### Roteador (Router)
Dispositivo responsável por interligar redes diferentes e encaminhar pacotes utilizando endereços IP.

### Access Point (AP)
Equipamento que fornece acesso sem fio a uma rede local.

### Modem
Dispositivo responsável por converter sinais digitais e analógicos para permitir o acesso a serviços de comunicação, como a Internet.

### Cabos e meios de transmissão
Meios físicos ou sem fio utilizados para transportar os dados, como:
- Cabo de par trançado (UTP/STP);
- Fibra óptica;
- Ondas de rádio (Wi-Fi);
- Redes celulares.

### Protocolos
Conjunto de regras que definem a comunicação entre dispositivos. Exemplos:
- TCP;
- IP;
- HTTP;
- HTTPS;
- DNS;
- DHCP.

# Modelos de referência

## Modelo OSI

> OSI (*Open Systems Interconnection*) é um modelo de referência criado pela **ISO (International Organization for Standardization)** para padronizar a comunicação entre sistemas de rede. Embora não seja utilizado diretamente na implementação da Internet, serve como base teórica para o estudo e desenvolvimento de protocolos de comunicação.

| Camada | Função da camada |
|----------|----------|
| Aplicação | Fornece serviços diretamente aos usuários e aplicações, como navegação web, e-mail e transferência de arquivos. |
| Apresentação | Responsável pela formatação, codificação, criptografia e compressão dos dados. |
| Sessão | Gerencia o estabelecimento, manutenção e encerramento das sessões de comunicação. |
| Transporte | Garante a entrega dos dados fim a fim, realizando controle de fluxo, segmentação e correção de erros. |
| Rede | Responsável pelo endereçamento lógico e roteamento dos pacotes entre redes. |
| Enlace | Realiza a comunicação entre dispositivos da mesma rede física, utilizando endereços MAC e controle de acesso ao meio. |
| Física | Define características elétricas, mecânicas e de transmissão dos sinais pelo meio físico. |
**Mnemônico das camadas OSI**
> Eu uso uma frase um pouco idiota para lembrar *Amaldiçoado ainda sem terra rei estupido foge* 

**Aplicação → Apresentação → Sessão → Transporte → Rede → Enlace → Física**

## Modelo TCP/IP

O modelo TCP/IP é o conjunto de protocolos utilizado pela Internet. Ele possui quatro camadas e foi desenvolvido antes do modelo OSI.

| Camada            | Relação com o OSI                |
| ----------------- | -------------------------------- |
| Aplicação         | Aplicação, Apresentação e Sessão |
| Transporte        | Transporte                       |
| Rede              | Rede                             |
| Interface de Rede | Enlace e Física                  |
**Mnemônico das camadas TCP/IP**
>Outra frase idiota *Avante trágico regente incompreendido*
### Principais protocolos por camada

> Os protocolos são essenciais para padronizar a rede e organizar o trafego de pacotes permitindo melhor 

| Camada          | Protocolos                                    |
| --------------- | --------------------------------------------- |
| Aplicação       | HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP |
| Transporte      | TCP, UDP                                      |
| Internet (Rede) | IP, ICMP, ARP                                 |
| Acesso à Rede   | Ethernet, Wi-Fi                               |

### Comparação entre OSI e TCP/IP

| Característica | OSI | TCP/IP |
|---------------|-----|---------|
| Número de camadas | 7 | 4 |
| Finalidade | Modelo de referência | Modelo prático utilizado na Internet |
| Criado por | ISO | DARPA |
| Uso atual | Acadêmico e conceitual | Implementação real das redes |

## Encapsulamento de dados

Durante a transmissão, os dados passam por um processo chamado **encapsulamento**, em que cada camada adiciona informações de controle.

| Camada | Unidade de dados |
|----------|----------|
| Aplicação | Dados |
| Transporte | Segmento (TCP) ou Datagrama (UDP) |
| Rede | Pacote |
| Enlace | Quadro (Frame) |
| Física | Bits |

No destino ocorre o processo inverso, chamado **desencapsulamento**, onde cada camada remove suas respectivas informações de controle até que os dados sejam entregues à aplicação.