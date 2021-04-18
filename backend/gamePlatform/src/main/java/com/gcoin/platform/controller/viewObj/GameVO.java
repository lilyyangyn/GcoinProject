package com.gcoin.platform.controller.viewObj;

import java.util.Date;

public class GameVO {
    private Integer gameId;

    private Integer companyId;

    private Date issueDate;

    private String gameDescription;

    private String category;

    private String name;

    private String trailerUrl;

    private String thumbnailPath;

    private String thumbnailBase64Str;

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public String getGameDescription() {
        return gameDescription;
    }

    public void setGameDescription(String gameDescription) {
        this.gameDescription = gameDescription == null ? null : gameDescription.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category == null ? null : category.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl == null ? null : trailerUrl.trim();
    }

    public String getThumbnailPath() {
        return thumbnailPath;
    }

    public void setThumbnailPath(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath == null ? null : thumbnailPath.trim();
    }

    public String getThumbnailBase64Str() {
        return thumbnailBase64Str;
    }

    public void setThumbnailBase64Str(String thumbnailBase64Str) {
        this.thumbnailBase64Str = thumbnailBase64Str == null ? null : thumbnailBase64Str.trim();
    }
}
