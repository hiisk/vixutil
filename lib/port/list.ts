/**
 * 네트워크 포트 121개 — 번호와 이름, 갈래만 적는다.
 *
 * 계산으로 나오지 않는 것은 "몇 번을 무엇이 쓰는가"뿐이다. 범위 갈래(잘 알려진
 * 포트·등록 포트·동적 포트), 권한이 필요한지, 16진수와 2진수, 앞뒤 이웃은 전부
 * 번호에서 나온다(facts.ts).
 *
 * 서비스 이름은 옮기지 않는다. SSH는 어느 나라 문서에서도 SSH이고, 번역하면
 * 오히려 그 나라 사람이 검색하는 말과 멀어진다. 대신 "무엇에 쓰는 갈래인가"만
 * 열 언어로 둔다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 널리 쓰이고 확인 가능한 것만 싣는다. IANA에 등록됐어도 아무도 안 쓰는 번호와,
 * 반대로 등록은 없지만 사실상 표준이 된 번호(3000·8080)를 함께 다룬다 —
 * 후자는 registered가 아니라 관습이라는 것을 화면에 적는다.
 */
export type PortGroup =
  | 'web' | 'mail' | 'file' | 'remote' | 'db' | 'name'
  | 'auth' | 'message' | 'monitor' | 'network' | 'dev' | 'other';

export type Proto = 'tcp' | 'udp' | 'both';

export interface Port {
  port: number;
  /** 짧은 이름 — 만국 공통이라 옮기지 않는다 */
  name: string;
  /** 무엇인지 한 마디 (영어) */
  service: string;
  group: PortGroup;
  proto: Proto;
  /** 암호화된 짝 — 80의 짝이 443이다. 양쪽 모두에 적지 않고 한쪽만 적는다 */
  secure?: number;
  /** IANA 등록이 아니라 관습으로 굳은 번호 */
  custom?: true;
}

const p = (
  port: number, name: string, service: string, group: PortGroup, proto: Proto,
  extra: { secure?: number; custom?: true } = {},
): Port => ({ port, name, service, group, proto, ...extra });

export const PORTS: Port[] = [
  /* ───────── 잘 알려진 포트 (0~1023) ───────── */
  p(1, 'tcpmux', 'TCP Port Service Multiplexer', 'other', 'tcp'),
  p(2, 'compressnet', 'Management Utility', 'other', 'both'),
  p(7, 'echo', 'Echo', 'other', 'both'),
  p(9, 'discard', 'Discard', 'other', 'both'),
  p(11, 'systat', 'Active Users', 'other', 'tcp'),
  p(13, 'daytime', 'Daytime', 'other', 'both'),
  p(15, 'netstat', 'Netstat', 'other', 'tcp'),
  p(17, 'qotd', 'Quote of the day', 'other', 'both'),
  p(19, 'chargen', 'Character generator', 'other', 'both'),
  p(20, 'ftp-data', 'FTP data transfer', 'file', 'tcp'),
  p(21, 'ftp', 'File Transfer Protocol', 'file', 'tcp', { secure: 990 }),
  p(22, 'ssh', 'Secure Shell', 'remote', 'tcp'),
  p(23, 'telnet', 'Telnet', 'remote', 'tcp', { secure: 992 }),
  p(25, 'smtp', 'Mail sending', 'mail', 'tcp', { secure: 465 }),
  p(37, 'time', 'Time protocol', 'other', 'both'),
  p(42, 'nameserver', 'Host Name Server', 'name', 'both'),
  p(43, 'whois', 'WHOIS directory', 'name', 'tcp'),
  p(49, 'tacacs', 'TACACS+ login', 'auth', 'both'),
  p(53, 'domain', 'DNS name lookup', 'name', 'both'),
  p(67, 'bootps', 'DHCP server', 'network', 'udp'),
  p(68, 'bootpc', 'DHCP client', 'network', 'udp'),
  p(69, 'tftp', 'Trivial FTP', 'file', 'udp'),
  p(70, 'gopher', 'Gopher', 'web', 'tcp'),
  p(79, 'finger', 'Finger user info', 'other', 'tcp'),
  p(80, 'http', 'Web', 'web', 'tcp', { secure: 443 }),
  p(88, 'kerberos', 'Kerberos authentication', 'auth', 'both'),
  p(101, 'hostname', 'NIC Host Name Server', 'name', 'tcp'),
  p(102, 'iso-tsap', 'ISO-TSAP (S7 PLC)', 'other', 'tcp'),
  p(109, 'pop2', 'Post Office Protocol 2', 'mail', 'tcp'),
  p(110, 'pop3', 'Mail retrieval', 'mail', 'tcp', { secure: 995 }),
  p(111, 'rpcbind', 'ONC RPC portmapper', 'file', 'both'),
  p(113, 'ident', 'Ident identification', 'auth', 'tcp'),
  p(115, 'sftp-legacy', 'Simple File Transfer Protocol', 'file', 'tcp'),
  p(119, 'nntp', 'Usenet news', 'message', 'tcp', { secure: 563 }),
  p(123, 'ntp', 'Network Time Protocol', 'other', 'udp'),
  p(135, 'msrpc', 'Microsoft RPC endpoint mapper', 'network', 'both'),
  p(137, 'netbios-ns', 'NetBIOS name service', 'name', 'udp'),
  p(138, 'netbios-dgm', 'NetBIOS datagram', 'network', 'udp'),
  p(139, 'netbios-ssn', 'NetBIOS session', 'file', 'tcp'),
  p(143, 'imap', 'Mail access', 'mail', 'tcp', { secure: 993 }),
  p(152, 'bftp', 'Background File Transfer', 'file', 'tcp'),
  p(161, 'snmp', 'SNMP polling', 'monitor', 'udp'),
  p(162, 'snmptrap', 'SNMP traps', 'monitor', 'udp'),
  p(177, 'xdmcp', 'X display manager', 'remote', 'udp'),
  p(179, 'bgp', 'Border Gateway Protocol', 'network', 'tcp'),
  p(194, 'irc', 'Internet Relay Chat', 'message', 'tcp'),
  p(210, 'z3950', 'Z39.50 library search', 'other', 'tcp'),
  p(322, 'rtsps', 'RTSP over TLS', 'other', 'tcp'),
  p(370, 'codaauth2', 'Coda authentication', 'auth', 'both'),
  p(389, 'ldap', 'Directory access', 'name', 'both', { secure: 636 }),
  p(427, 'svrloc', 'Service Location Protocol', 'name', 'both'),
  p(443, 'https', 'Web over TLS', 'web', 'tcp'),
  p(445, 'microsoft-ds', 'SMB file sharing', 'file', 'tcp'),
  p(464, 'kpasswd', 'Kerberos password change', 'auth', 'both'),
  p(465, 'smtps', 'Mail sending over TLS', 'mail', 'tcp'),
  p(500, 'isakmp', 'IKE key exchange for IPsec', 'network', 'udp'),
  p(512, 'exec', 'Remote process execution', 'remote', 'tcp'),
  p(513, 'login', 'Remote login (rlogin)', 'remote', 'tcp'),
  p(514, 'syslog', 'System logging', 'monitor', 'udp'),
  p(515, 'printer', 'Line printer daemon', 'other', 'tcp'),
  p(517, 'talk', 'Talk', 'message', 'udp'),
  p(520, 'router', 'RIP routing', 'network', 'udp'),
  p(540, 'uucp', 'UUCP', 'file', 'tcp'),
  p(543, 'klogin', 'Kerberos login', 'auth', 'tcp'),
  p(544, 'kshell', 'Kerberos remote shell', 'auth', 'tcp'),
  p(546, 'dhcpv6-client', 'DHCPv6 client', 'network', 'udp'),
  p(547, 'dhcpv6-server', 'DHCPv6 server', 'network', 'udp'),
  p(548, 'afp', 'Apple Filing Protocol', 'file', 'tcp'),
  p(554, 'rtsp', 'Streaming control', 'other', 'both'),
  p(563, 'nntps', 'Usenet news over TLS', 'message', 'tcp'),
  p(587, 'submission', 'Mail submission', 'mail', 'tcp'),
  p(623, 'ipmi', 'IPMI / BMC', 'monitor', 'udp'),
  p(631, 'ipp', 'Internet Printing Protocol', 'other', 'both'),
  p(636, 'ldaps', 'Directory access over TLS', 'name', 'tcp'),
  p(853, 'dns-over-tls', 'DNS over TLS', 'name', 'tcp'),
  p(873, 'rsync', 'rsync file sync', 'file', 'tcp'),
  p(989, 'ftps-data', 'FTPS data transfer', 'file', 'tcp'),
  p(990, 'ftps', 'FTP over TLS', 'file', 'tcp'),
  p(992, 'telnets', 'Telnet over TLS', 'remote', 'tcp'),
  p(993, 'imaps', 'Mail access over TLS', 'mail', 'tcp'),
  p(995, 'pop3s', 'Mail retrieval over TLS', 'mail', 'tcp'),
  /* ───────── 등록 포트 (1024~49151) ───────── */
  p(1080, 'socks', 'SOCKS proxy', 'network', 'tcp'),
  p(1099, 'rmiregistry', 'Java RMI registry', 'dev', 'tcp'),
  p(1194, 'openvpn', 'OpenVPN', 'network', 'both'),
  p(1433, 'ms-sql-s', 'Microsoft SQL Server', 'db', 'tcp'),
  p(1434, 'ms-sql-m', 'SQL Server browser', 'db', 'udp'),
  p(1521, 'oracle', 'Oracle Database listener', 'db', 'tcp'),
  p(1701, 'l2tp', 'L2TP tunnelling', 'network', 'udp'),
  p(1723, 'pptp', 'PPTP tunnelling', 'network', 'tcp'),
  p(1812, 'radius', 'RADIUS authentication', 'auth', 'udp'),
  p(1813, 'radius-acct', 'RADIUS accounting', 'auth', 'udp'),
  p(1883, 'mqtt', 'MQTT messaging', 'message', 'tcp', { secure: 8883 }),
  p(1900, 'ssdp', 'SSDP (UPnP discovery)', 'network', 'udp'),
  p(2049, 'nfs', 'Network File System', 'file', 'both'),
  p(2082, 'cpanel', 'cPanel', 'web', 'tcp', { secure: 2083 }),
  p(2083, 'cpanel-ssl', 'cPanel over TLS', 'web', 'tcp'),
  p(2086, 'whm', 'WHM', 'web', 'tcp', { secure: 2087 }),
  p(2087, 'whm-ssl', 'WHM over TLS', 'web', 'tcp'),
  p(2181, 'zookeeper', 'Apache ZooKeeper', 'dev', 'tcp'),
  p(2222, 'ssh-alt', 'SSH (관습적 대체 포트)', 'remote', 'tcp', { custom: true }),
  p(2375, 'docker', 'Docker daemon', 'dev', 'tcp', { secure: 2376 }),
  p(2376, 'docker-s', 'Docker daemon over TLS', 'dev', 'tcp'),
  p(2379, 'etcd-client', 'etcd client API', 'dev', 'tcp'),
  p(2380, 'etcd-peer', 'etcd peer traffic', 'dev', 'tcp'),
  p(3000, 'dev-http', 'Local dev server', 'dev', 'tcp', { custom: true }),
  p(3050, 'firebird', 'Firebird SQL', 'db', 'tcp'),
  p(3128, 'squid', 'Squid proxy', 'network', 'tcp'),
  p(3260, 'iscsi', 'iSCSI storage target', 'file', 'tcp'),
  p(3306, 'mysql', 'MySQL and MariaDB', 'db', 'tcp'),
  p(3389, 'rdp', 'Remote Desktop', 'remote', 'both'),
  p(3478, 'stun', 'STUN / TURN', 'network', 'both'),
  p(3690, 'svn', 'Subversion', 'dev', 'tcp'),
  p(4200, 'angular-dev', 'Angular dev server', 'dev', 'tcp', { custom: true }),
  p(4369, 'epmd', 'Erlang port mapper', 'dev', 'tcp'),
  p(4444, 'selenium', 'Selenium Grid', 'dev', 'tcp', { custom: true }),
  p(5000, 'dev-alt', 'Local dev server, UPnP', 'dev', 'tcp', { custom: true }),
  p(5060, 'sip', 'SIP call setup', 'message', 'both', { secure: 5061 }),
  p(5061, 'sips', 'SIP over TLS', 'message', 'tcp'),
  p(5173, 'vite-dev', 'Vite dev server', 'dev', 'tcp', { custom: true }),
  p(5222, 'xmpp-client', 'XMPP client', 'message', 'tcp'),
  p(5269, 'xmpp-server', 'XMPP server link', 'message', 'tcp'),
  p(5353, 'mdns', 'Multicast DNS', 'name', 'udp'),
  p(5355, 'llmnr', 'LLMNR', 'name', 'both'),
  p(5432, 'postgresql', 'PostgreSQL', 'db', 'tcp'),
  p(5601, 'kibana', 'Kibana', 'monitor', 'tcp'),
  p(5672, 'amqp', 'AMQP messaging', 'message', 'tcp'),
  p(5900, 'vnc', 'VNC screen sharing', 'remote', 'tcp'),
  p(5984, 'couchdb', 'CouchDB', 'db', 'tcp'),
  p(5985, 'winrm', 'WinRM HTTP', 'remote', 'tcp', { secure: 5986 }),
  p(5986, 'winrm-https', 'WinRM HTTPS', 'remote', 'tcp'),
  p(6000, 'x11', 'X Window System', 'remote', 'tcp'),
  p(6060, 'pprof', 'Go pprof', 'monitor', 'tcp', { custom: true }),
  p(6379, 'redis', 'Redis', 'db', 'tcp'),
  p(6443, 'kube-api', 'Kubernetes API server', 'dev', 'tcp'),
  p(6667, 'ircd', 'IRC server', 'message', 'tcp'),
  p(6881, 'bittorrent', 'BitTorrent', 'other', 'both'),
  p(7000, 'cassandra-gossip', 'Cassandra inter-node', 'db', 'tcp'),
  p(8000, 'http-dev', 'Local HTTP server', 'dev', 'tcp', { custom: true }),
  p(8006, 'proxmox', 'Proxmox VE web UI', 'monitor', 'tcp', { custom: true }),
  p(8009, 'ajp13', 'Apache JServ Protocol', 'web', 'tcp'),
  p(8080, 'http-alt', 'Alternate web port', 'web', 'tcp', { secure: 8443 }),
  p(8086, 'influxdb', 'InfluxDB', 'db', 'tcp'),
  p(8123, 'home-assistant', 'Home Assistant', 'monitor', 'tcp', { custom: true }),
  p(8443, 'https-alt', 'Alternate web port over TLS', 'web', 'tcp'),
  p(8883, 'mqtts', 'MQTT over TLS', 'message', 'tcp'),
  p(8888, 'jupyter', 'Jupyter, alternate HTTP', 'dev', 'tcp', { custom: true }),
  p(9000, 'php-fpm', 'PHP-FPM, MinIO, SonarQube', 'dev', 'tcp', { custom: true }),
  p(9042, 'cassandra', 'Apache Cassandra', 'db', 'tcp'),
  p(9090, 'prometheus', 'Prometheus', 'monitor', 'tcp'),
  p(9092, 'kafka', 'Apache Kafka', 'message', 'tcp'),
  p(9093, 'alertmanager', 'Prometheus Alertmanager', 'monitor', 'tcp', { custom: true }),
  p(9100, 'jetdirect', 'Raw printing, node_exporter', 'other', 'tcp'),
  p(9200, 'elasticsearch', 'Elasticsearch HTTP', 'db', 'tcp'),
  p(9300, 'es-transport', 'Elasticsearch transport', 'db', 'tcp'),
  p(9418, 'git', 'Git protocol', 'dev', 'tcp'),
  p(10000, 'webmin', 'Webmin', 'web', 'tcp'),
  p(11211, 'memcached', 'Memcached', 'db', 'both'),
  p(11434, 'ollama', 'Ollama', 'dev', 'tcp', { custom: true }),
  p(15672, 'rabbitmq-mgmt', 'RabbitMQ management', 'message', 'tcp'),
  p(19132, 'minecraft-bedrock', 'Minecraft Bedrock', 'other', 'udp', { custom: true }),
  p(25565, 'minecraft', 'Minecraft server', 'other', 'tcp', { custom: true }),
  p(27017, 'mongodb', 'MongoDB', 'db', 'tcp'),
  /* ───────── 동적·사설 포트 (49152~65535) ───────── */
  p(50000, 'db2', 'IBM Db2', 'db', 'tcp'),
  p(51820, 'wireguard', 'WireGuard', 'network', 'udp', { custom: true }),
];

export const PORT_SLUGS = PORTS.map(x => String(x.port));

export const portOf = (slug: string): Port | undefined =>
  PORTS.find(x => String(x.port) === slug);

/** 범위의 경계 — 계산도 화면도 이 값을 본다 */
export const WELL_KNOWN_MAX = 1023;
export const REGISTERED_MAX = 49151;
export const PORT_MAX = 65535;

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const PORT_ICON = '🔌';
