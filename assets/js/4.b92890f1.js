(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{172:function(e,r,a){"use strict";a.r(r);var t=a(0),s=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述","aria-hidden":"true"}},[e._v("#")]),e._v(" 概述")]),e._v(" "),a("p",[e._v("Druid是一个专门针对事件数据的OLAP查询而设计的开源数据存储系统。此页面旨在为读者介绍关于Druid存储数据的高级概述，以及Druid集群的架构。")]),e._v(" "),a("h2",{attrs:{id:"数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据","aria-hidden":"true"}},[e._v("#")]),e._v(" 数据")]),e._v(" "),a("p",[e._v("我们从一个在线广告的示例数据集开始讨论：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("timestamp             publisher          advertiser  gender  country  click  price\n2011-01-01T01:01:35Z  bieberfever.com    google.com  Male    USA      0      0.65\n2011-01-01T01:03:63Z  bieberfever.com    google.com  Male    USA      0      0.62\n2011-01-01T01:04:51Z  bieberfever.com    google.com  Male    USA      1      0.45\n2011-01-01T01:00:00Z  ultratrimfast.com  google.com  Female  UK       0      0.87\n2011-01-01T02:00:00Z  ultratrimfast.com  google.com  Female  UK       0      0.99\n2011-01-01T02:00:00Z  ultratrimfast.com  google.com  Female  UK       1      1.53\n")])])]),a("p",[e._v("熟悉OLAP的同学应该对这些概念肯定不会陌生，Druid也把数据集分为三个部分：")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Timestamp column(时间字段)")]),e._v(":将时间字段单独处理，是因为Druid的所有查询都是围绕时间轴进行的。")]),e._v(" "),a("li",[a("strong",[e._v("Dimension columns(维度字段)")]),e._v(": 维度字段是数据的属性，一般被用来做数据的过滤。在示例数据集中有四个维度：publisher、advertiser、gender和 country。它们各自代表了我们用来分割数据的轴。")]),e._v(" "),a("li",[a("strong",[e._v("Metric columns(度量字段)")]),e._v(":度量字段是用来做数据的聚合计算的。在示例中， click和price是俩个度量。度量是可以衡量的数据，一般可以做count、sum等操作。在OLAP术语中也叫measures。")])]),e._v(" "),a("h2",{attrs:{id:"汇总"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#汇总","aria-hidden":"true"}},[e._v("#")]),e._v(" 汇总")]),e._v(" "),a("p",[e._v("在海量数据处理中，一般对于单条的细分数据并不感兴趣，因为存在数万亿计这样的事件。然而这类数据的统计汇总是很有用的，Druid通过roll-up过程的处理，使数据在摄取加载阶段就做了汇总处理。Roll-up（汇总）是在维度过滤之前就做的第一级聚合操作。相等于如下伪代码：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("GROUP BY timestamp, publisher, advertiser, gender, country\n  :: impressions = COUNT(1),  clicks = SUM(click),  revenue = SUM(price)\n")])])]),a("p",[e._v("原始数据压缩聚合之后就是这个样子：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" timestamp             publisher          advertiser  gender country impressions clicks revenue\n 2011-01-01T01:00:00Z  ultratrimfast.com  google.com  Male   USA     1800        25     15.70\n 2011-01-01T01:00:00Z  bieberfever.com    google.com  Male   USA     2912        42     29.18\n 2011-01-01T02:00:00Z  ultratrimfast.com  google.com  Male   UK      1953        17     17.31\n 2011-01-01T02:00:00Z  bieberfever.com    google.com  Male   UK      3194        170    34.01\n")])])]),a("p",[e._v("可以看到，通过roll-up汇总数据后可以大大减少需要存储的数据量（高达100倍）。Druid在接收数据的时候汇总数据，以最小化需要存储的原始数据量。但是这种存储减少是有代价的，当我们roll up数据后，就没办法再查询详细数据了。换句话说roll-up后的粒度就是你能够探索数据的最小粒度，事件被分配到这个粒度。因此，Druid摄取规范将此粒度定义为数据的queryGranularity， 支持的最低queryGranularity是毫秒。")]),e._v(" "),a("h2",{attrs:{id:"分片数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分片数据","aria-hidden":"true"}},[e._v("#")]),e._v(" 分片数据")]),e._v(" "),a("p",[e._v("Druid的数据分片称为 segments，druid总是最先通过时间来分片，上面例子中我们聚合后的数据，可以按小时分为俩分片：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Segment sampleData_2011-01-01T01:00:00:00Z_2011-01-01T02:00:00:00Z_v1_0包含\n 2011-01-01T01:00:00Z  ultratrimfast.com  google.com  Male   USA     1800        25     15.70\n 2011-01-01T01:00:00Z  bieberfever.com    google.com  Male   USA     2912        42     29.18\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Segment sampleData_2011-01-01T02:00:00:00Z_2011-01-01T03:00:00:00Z_v1_0包含\n 2011-01-01T02:00:00Z  ultratrimfast.com  google.com  Male   UK      1953        17     17.31\n 2011-01-01T02:00:00Z  bieberfever.com    google.com  Male   UK      3194        170    34.01\n")])])]),a("p",[e._v("segments是一个包含数据的独立容器，内部数据以时间分割。segments为聚合的列做索引，数据依赖索引，按列方式存储。 所以druid得查询就转为了如何扫描segments了。\nsegment 由datasource（数据源）、interval（间隔）、version（版本号）和一个可选的分区号唯一的确定。 例如上面例子中，我们的segment的名字就是这种格式dataSource_interval_version_partitionNumber。")]),e._v(" "),a("h2",{attrs:{id:"索引数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#索引数据","aria-hidden":"true"}},[e._v("#")]),e._v(" 索引数据")]),e._v(" "),a("p",[e._v("Druid能够取得这样的查询速度，主要取决于数据的存储方式。借鉴google等搜索引擎的思路，Druid生成不可变的数据快照，存储在针对分析查询高度优化的数据结构中。\nDruid是列式存储也就意味着每一个列都是单独存储的。Druid查询时只会使用到与查询相关的列，而且Druid很好的支持了在查询时只扫描其需要的。不同的列可以采用不同的压缩方法，也能够建立与它们相关的不同索引。\nDruid在每一个分片级别（segment）建立索引。")]),e._v(" "),a("h2",{attrs:{id:"记载数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#记载数据","aria-hidden":"true"}},[e._v("#")]),e._v(" 记载数据")]),e._v(" "),a("p",[e._v("Druid有实时和批量两种方式进行数据摄取。Druid中实时数据摄取方式是尽力而为。Druid暂时实时摄取暂时无法支持正好一次（Exactly once），当然在后续版本计划中会尽量去支持。通过批量创建能够准确映射到摄取数据的段，批量摄取提供了正好一次的保证。使用Druid的通用方式是用实时管道获取实时数据，用批量管道处理副本数据。")]),e._v(" "),a("h2",{attrs:{id:"查询数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询数据","aria-hidden":"true"}},[e._v("#")]),e._v(" 查询数据")]),e._v(" "),a("p",[e._v("Druid的本地查询语言是JSON通过HTTP，虽然社区在众多的语言中提供了查询库，包括SQL查询贡献库。\nDruid设计用于单表操作，目前不支持join操作。因为加载到Druid中的数据需要规范化，许多产品准备在数据ETL（Extract-Transform-Load）阶段进行join。")]),e._v(" "),a("h2",{attrs:{id:"集群"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#集群","aria-hidden":"true"}},[e._v("#")]),e._v(" 集群")]),e._v(" "),a("p",[e._v("Druid集群是由不同类型节点组成的，每个节点各司其职：")]),e._v(" "),a("ul",[a("li",[e._v("Historical Nodes 历史节点通常构成Druid集群的骨干，历史节点在本地下载不可变的段，并对这些段进行查询。这些节点有一个无共享的体系结构，并知道如何加载数据段、丢弃数据段,并对数据段进行查询。")]),e._v(" "),a("li",[e._v("Broker Nodes Broker节点是客户端和应用从Druid查询获取数据的地方。Broker节点负责分配查询并且收集和合并结果，Broker节点知道哪些段放在哪里。")]),e._v(" "),a("li",[e._v("Coordinator Nodes Coordinator节点负责管理集群中历史节点的段，协调器节点告诉历史节点加载新的段、删除旧的段并且移动段来达到负载均衡。")]),e._v(" "),a("li",[e._v("Real-time Processing Druid中的实时处理可以使用独立的实时节点或使用索引服务来完成。实时逻辑在这两个服务之间是共同的。实时处理包括接收数据、索引数据(创建数据段)和将数据段传输到历史节点。通过实时处理逻辑接收数据，数据就是可查询的。切换过程也是无损的，数据在整个过程中保持可查询。")])]),e._v(" "),a("h2",{attrs:{id:"外部依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#外部依赖","aria-hidden":"true"}},[e._v("#")]),e._v(" 外部依赖")]),e._v(" "),a("p",[e._v("Druid对集群操作有几个外部依赖关系。")]),e._v(" "),a("ul",[a("li",[e._v("Zookeeper Druid依赖zookeeper进行集群内部通信。")]),e._v(" "),a("li",[e._v("Metadata Storage Druid依赖元数据存储来存储段和配置的元数据。创建段的服务向元数据存储写入新条目，并且协调器节点监视元数据存储以知道何时需要加载新数据或需要丢弃旧数据。元数据存储不包含在查询路径中。MySQL和PostgreSQL是生产系统中常用的元数据存储数据库。当在单机系统上运行所有Druid节点，可以使用Derby 数据库。")]),e._v(" "),a("li",[e._v("Deep Storage 深度存储用作段的永久备份。创建段的服务将段上传到深度存储，历史节点从深度节点上下载段。深度存储也不包含在查询路径里。S3和HDFS是流行的深度存储方式。")])]),e._v(" "),a("h2",{attrs:{id:"高可用性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#高可用性","aria-hidden":"true"}},[e._v("#")]),e._v(" 高可用性")]),e._v(" "),a("p",[e._v("Druid设计避免了单点故障。不同类型的节点故障并不会影响其他类型节点的服务。为了运行高可用的Druid集群，需要每个节点类型至少2个节点。")])])}],!1,null,null,null);s.options.__file="README.md";r.default=s.exports}}]);