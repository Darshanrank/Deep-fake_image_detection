const Header = () => {
    return (
        <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
              <a href="/" className="flex items-center">
                <img src="/truevision-logo.png" alt="Truevision Logo" className="h-12 w-auto" />
            </a>
            <h1 className="text-green-400 text-xl font-bold">TrueVision</h1>
            <nav className="space-x-4">
                <a href="#" className="hover:text-green-400">Detect</a>
                <a href="#" className="hover:text-red-400">Logout</a>
            </nav>
        </header>
    );
};

export default Header;
