import "./SkeletonAnimation.css";
export default function JobCardSkeleton() {
    return (
        <div className="skeleton-container">
            {[...Array(4)].map(
                (
                    _,
                    index // Skapa 9 skeletons
                ) => (
                    <div className="skeleton-card" key={index}>
                        <div className="skeleton-description">
                            <span className="skeleton-large-text"></span>
                            <span className="skeleton-small-text"></span>
                            <span className="skeleton-small-text"></span>
                            <span className="skeleton-small-text"></span>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
