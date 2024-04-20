import React, {useState} from 'react';

// Mock 数据
const data = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Carlie'},
    {id: 4, name: 'harli'},
    {id: 5, name: 'Charie'},
    {id: 6, name: 'halie'},
    {id: 7, name: 'Chrlie'},
    {id: 8, name: 'Carlie'},
];

// 分页组件的属性接口
interface PaginationProps {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// 分页组件
const Pagination: React.FC<PaginationProps> = ({
    total,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(total / itemsPerPage);
    const pages = new Array(totalPages).fill(0).map((_, i) => i + 1);
    return (
        <div>
            {pages.map((page) => (
                <button
                    key={page}
                    disabled={currentPage === page}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

// 搜索组件
const PaginationComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // 一页 数据个数
    const itemsPerPage = 5;

    // 根据搜索词筛选数据
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 获取当前页的数据
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 处理搜索词改变
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // 重置到第一页
    };

    // 渲染搜索结果和分页控件
    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
            <ul>
                {paginatedData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <Pagination
                total={filteredData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default PaginationComponent;
